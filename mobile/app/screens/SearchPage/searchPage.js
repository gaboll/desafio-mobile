import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {getAllProducts} from '../../services/products';

import MenuButton from '../../assets/icons/Menu.svg';
import Search from '../../assets/icons/Search.svg';

import {ProductCard, Header} from '../../components';

const searchPage = ({route, navigation}) => {
  const {argument} = route.params;

  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [maxLoad, setMaxLoad] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchArgument, setSearchArgument] = useState('');
  const [searchedArgument, setSearchedArgument] = useState(argument);
  const [firstLoad, setFirstLoad] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);

      const {data} = await getAllProducts(offset, searchedArgument);
      setProducts([...products, ...data.Products]);

      setMaxLoad(data.Total);
      setOffset(offset + 10);

      setLoading(false);
      setFirstLoad(true);
      setSearchArgument('');
    } catch (error) {
      setTimeout(() => {
        Alert.alert('Atenção', '\rOcorreu um erro inesperado!', [
          {
            style: 'cancel',
            text: 'OK',
          },
        ]);
      }, 10);
    }
  };

  const loadMoreProducts = async () => {
    if (loading || products.length >= maxLoad) {
      return;
    }
    try {
      setLoading(true);

      const {data} = await getAllProducts(offset, searchedArgument);
      setProducts([...products, ...data.Products]);

      if (offset < maxLoad - 10) {
        setOffset(offset + 10);
      }

      setLoading(false);
    } catch (error) {
      setTimeout(() => {
        Alert.alert('Atenção', '\rOcorreu um erro inesperado!', [
          {
            style: 'cancel',
            text: 'OK',
          },
        ]);
      }, 10);
    }
  };

  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  };

  return (
    <>
      <Header
        onChangeTextInput={text => {
          setSearchArgument(text);
          if (searchArgument.length >= 3) {
            setOffset(0);
            setMaxLoad(0);
            setProducts([]);
          }
        }}
        textInputValue={searchArgument}
        onSubmitEditinTextInput={() => {
          if (searchArgument.length >= 3) {
            setOffset(0);
            setMaxLoad(0);
            setProducts([]);
            setSearchedArgument(searchArgument);
            setSearchArgument('');
            getProducts();
          }
        }}
        onPressSearchButton={() => {
          if (searchArgument.length >= 3) {
            setOffset(0);
            setMaxLoad(0);
            setProducts([]);
            setSearchedArgument(searchArgument);
            setSearchArgument('');
            getProducts();
          }
        }}
      />
      {firstLoad && (
        <View style={styles.searchingField}>
          <View style={styles.searchingFieldLeft}>
            <Text style={styles.searchingForText}>Você buscou por:</Text>
            <Text style={styles.searchThermText}>{searchedArgument}</Text>
          </View>
          <View style={styles.searchingFieldRight}>
            <Text style={styles.searchResults}>{maxLoad}</Text>
            <Text style={styles.searchResults}>Resultados</Text>
          </View>
        </View>
      )}
      {products.length > 0 && (
        <FlatList
          data={products}
          renderItem={item => <ProductCard product={item} />}
          keyExtractor={(item, index) => index}
          numColumns={2}
          contentContainerStyle={styles.container}
          onEndReached={() => {
            loadMoreProducts();
          }}
          onEndReachedThreshold={0.25}
          ListFooterComponent={renderFooter}
        />
      )}
      {products.length === 0 && !loading && (
        <View style={styles.noItemFoundContainer}>
          <Text style={styles.noItemFoundText}>Nenhum intem encontrado!</Text>
        </View>
      )}
      {products.length === 0 && loading && <ActivityIndicator />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EFF4',
  },
  searchingField: {
    height: 50,
    backgroundColor: 'white',
    padding: 5,
    elevation: 5,
    flexDirection: 'row',
  },
  searchingForText: {
    fontSize: 12,
  },
  searchThermText: {
    color: 'red',
  },
  searchingFieldLeft: {
    flex: 1,
  },
  searchingFieldRight: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  searchResults: {
    fontSize: 11,
    color: '#b5b5b5',
  },
  noItemFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemFoundText: {
    fontSize: 22,
  },
});

export default searchPage;

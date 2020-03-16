import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';

import {getAllProducts} from '../../services/products';
import {getAllCategories} from '../../services/categories';

import {ProductCard, Header} from '../../components';

const Home = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [maxLoad, setMaxLoad] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchArgument, setSearchArgument] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const {data} = await getAllCategories();
      setCategoryList(data.Categories);
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

  const getProducts = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);

      const {data} = await getAllProducts(offset, searchArgument);
      setProducts([...products, ...data.Products]);

      setMaxLoad(data.Total);
      setOffset(offset + 10);

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

  const loadMoreProducts = async () => {
    if (loading || products.length >= maxLoad) {
      return;
    }
    try {
      setLoading(true);

      const {data} = await getAllProducts(offset, '');
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
        leftButtonType={'MenuButton'}
        onChangeTextInput={text => {
          setSearchArgument(text);
        }}
        textInputValue={searchArgument}
        onSubmitEditinTextInput={() => {
          if (searchArgument.length >= 3) {
            navigation.navigate('SearchPage', {argument: searchArgument});
            setSearchArgument('');
          }
        }}
        onPressSearchButton={() => {
          if (searchArgument.length >= 3) {
            navigation.navigate('SearchPage', {argument: searchArgument});
            setSearchArgument('');
          }
        }}
      />
      <View style={styles.categoriesField}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Categories', {categoryList});
          }}>
          <Text style={styles.categoriesText}>Categorias</Text>
        </TouchableOpacity>
      </View>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EFF4',
  },
  categoriesField: {
    height: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
    padding: 10,
  },
  categoriesText: {
    fontSize: 16,
    color: 'white',
  },
});

export default Home;

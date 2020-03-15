import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {getAllProducts} from '../../services/products';

import Favorite from '../../assets/icons/Favorite.svg';
import MenuButton from '../../assets/icons/Menu.svg';
import Search from '../../assets/icons/Search.svg';

const Page1 = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [maxLoad, setMaxLoad] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchArgument, setSearchArgument] = useState('');

  useEffect(() => {
    getProducts();
  }, []);

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

      const {data} = await getAllProducts(offset, searchArgument);
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

  const RenderOffer = offer => {
    const {ListPrice} = offer;
    const {Price} = offer;
    const offerResult = Math.floor((1 - Price / ListPrice) * 100);

    return (
      <View style={styles.drawCircle}>
        <Text style={styles.percentualText}>{offerResult}%</Text>
        <Text style={styles.offText}>OFF</Text>
      </View>
    );
  };

  const RenderCard = product => {
    const {item} = product.product;
    const {ImageUrl} = item.Skus[0].Images[0];
    const {ListPrice} = item.Skus[0].Sellers[0];
    const {Price} = item.Skus[0].Sellers[0];
    const {BestInstallment} = item.Skus[0].Sellers[0];
    return (
      <View style={styles.card}>
        <View style={styles.topCardContainer}>
          <View style={styles.offerContainer}>
            {ListPrice > Price && (
              <RenderOffer ListPrice={ListPrice} Price={Price} />
            )}
          </View>
          <View style={styles.favoriteContainer}>
            <TouchableOpacity>
              <Favorite width={30} height={30} fill={'#5F5F5F'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.productPhotoContainer}>
          <Image
            source={{
              uri: ImageUrl,
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <View style={styles.productDescriptionContainer}>
          <Text style={styles.textProductDescription}>{item.Name}</Text>
        </View>
        <View style={styles.productPriceContainer}>
          {BestInstallment && (
            <>
              {ListPrice > Price && (
                <Text style={styles.discoutPrice}>
                  R$ {ListPrice.toFixed(2)}
                </Text>
              )}
              <Text style={styles.price}>R$ {Price.toFixed(2)}</Text>
              <Text style={styles.installmentPrice}>
                {`${
                  BestInstallment.Count
                }x de R$ ${BestInstallment.Value.toFixed(2)}`}
              </Text>
            </>
          )}
          {!BestInstallment && (
            <Text style={styles.unavailableProductText}>
              Produto Indisponível!
            </Text>
          )}
        </View>
      </View>
    );
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
      <View style={styles.headerContainer}>
        <View style={styles.menuButtonContainer}>
          <TouchableOpacity>
            <MenuButton width={30} height={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchField}>
          <TextInput
            style={styles.searchInputText}
            placeholder={'Buscar produto'}
            onChangeText={text => {
              setSearchArgument(text);
              if (searchArgument.length >= 3) {
                setOffset(0);
                setMaxLoad(0);
                setProducts([]);
              }
            }}
            value={searchArgument}
            onSubmitEditing={() => {
              if (searchArgument.length >= 3) {
                setOffset(0);
                setMaxLoad(0);
                setProducts([]);
                getProducts();
                setSearchArgument('');
              }
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if (searchArgument.length >= 3) {
                setOffset(0);
                setMaxLoad(0);
                setProducts([]);
                getProducts();
                setSearchArgument('');
              }
            }}>
            <Search width={35} height={35} fill={'white'} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={products}
        renderItem={item => <RenderCard product={item} />}
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
  card: {
    width: '48%',
    height: 430,
    margin: '1%',
    backgroundColor: 'white',
    position: 'relative',
  },
  topCardContainer: {
    flex: 0.2,
    flexDirection: 'row',
  },
  productPhotoContainer: {
    flex: 1,
  },
  productDescriptionContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
  },
  textProductDescription: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 5,
  },
  productPriceContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discoutPrice: {
    textDecorationLine: 'line-through',
    fontSize: 12,
    color: '#bfbfbf',
  },
  price: {
    color: 'green',
    fontSize: 16,
  },
  installmentPrice: {
    color: 'green',
    fontSize: 12,
  },
  drawCircle: {
    height: 38,
    width: 38,
    borderRadius: 38 / 2,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentualText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
    includeFontPadding: false,
  },
  offText: {
    fontSize: 9,
    color: 'white',
    includeFontPadding: false,
  },
  offerContainer: {
    flex: 1,
    padding: 5,
  },
  favoriteContainer: {
    flex: 1,
    alignItems: 'flex-end',
    padding: 5,
  },
  unavailableProductText: {
    fontSize: 16,
    color: '#757575',
  },
  headerContainer: {
    height: 50,
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  menuButtonContainer: {
    height: '100%',
    justifyContent: 'center',
    padding: 10,
  },
  searchField: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchInputText: {
    height: 35,
    width: 250,
    backgroundColor: 'white',
    borderColor: '#cdcdcd',
    borderWidth: 1,
    borderRadius: 5,
    paddingBottom: 5,
  },
});

export default Page1;

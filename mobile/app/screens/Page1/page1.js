import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, FlatList, Alert} from 'react-native';
import Favorite from '../../assets/icons/Favorite.svg';
import {getAllProducts} from '../../services/products';

const Page1 = ({navigation}) => {
  const [products, setProducts] = useState('');

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const {data} = await getAllProducts();
      setProducts(data.Products);
      // console.log(products);
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
    const {Count} = item.Skus[0].Sellers[0].BestInstallment;
    const {Value} = item.Skus[0].Sellers[0].BestInstallment;
    // console.log(item);
    return (
      <View style={styles.card}>
        <View style={styles.topCardContainer}>
          <View style={styles.offerContainer}>
            {ListPrice > Price && (
              <RenderOffer ListPrice={ListPrice} Price={Price} />
            )}
          </View>
          <View style={styles.favoriteContainer}>
            <Favorite width={30} height={30} fill={'#5F5F5F'} />
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
          {ListPrice > Price && (
            <Text style={styles.discoutPrice}>R$ {ListPrice.toFixed(2)}</Text>
          )}
          <Text style={styles.price}>R$ {Price.toFixed(2)}</Text>
          <Text style={styles.installmentPrice}>
            {`${Count}x de R$ ${Value.toFixed(2)}`}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={products}
      renderItem={item => <RenderCard product={item} />}
      keyExtractor={(item, index) => index}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
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
    fontSize: 10,
    color: '#bfbfbf',
  },
  price: {
    color: 'green',
  },
  installmentPrice: {
    color: 'green',
    fontSize: 10,
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
});

export default Page1;

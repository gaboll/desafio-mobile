import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

import Favorite from '../../assets/icons/Favorite.svg';

const ProductCard = props => {
  const {item} = props.product;
  const {ImageUrl} = item.Skus[0].Images[0];
  const {ListPrice} = item.Skus[0].Sellers[0];
  const {Price} = item.Skus[0].Sellers[0];
  const {BestInstallment} = item.Skus[0].Sellers[0];

  const RenderOffer = () => {
    const offerResult = Math.floor((1 - Price / ListPrice) * 100);

    return (
      <View style={styles.drawCircle}>
        <Text style={styles.percentualText}>{offerResult}%</Text>
        <Text style={styles.offText}>OFF</Text>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.topCardContainer}>
        <View style={styles.offerContainer}>
          {ListPrice > Price && (
            <RenderOffer ListPrice={ListPrice} Price={Price} />
          )}
        </View>
        <View style={styles.favoriteContainer}>
          <TouchableOpacity onPress={props.onPressFavoriteButton || (() => {})}>
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
              <Text style={styles.discoutPrice}>R$ {ListPrice.toFixed(2)}</Text>
            )}
            <Text style={styles.price}>R$ {Price.toFixed(2)}</Text>
            <Text style={styles.installmentPrice}>
              {`${BestInstallment.Count}x de R$ ${BestInstallment.Value.toFixed(
                2,
              )}`}
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
});

export default React.memo(ProductCard);

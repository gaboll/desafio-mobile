import React from 'react';
import {StyleSheet, View, TouchableOpacity, TextInput} from 'react-native';

import MenuButton from '../../assets/icons/Menu.svg';
import Search from '../../assets/icons/Search.svg';
import ArrowBackWhite from '../../assets/icons/ArrowBack-white.svg';

const ProductCard = props => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.menuButtonContainer}>
        <TouchableOpacity onPress={props.onPressLeftButton || (() => {})}>
          {props.leftButtonType === 'MenuButton' && (
            <MenuButton width={30} height={30} />
          )}
          {props.leftButtonType === 'GoBackButton' && (
            <ArrowBackWhite width={20} height={20} fill="white" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.searchField}>
        <TextInput
          style={styles.searchInputText}
          placeholder={'Buscar produto'}
          onChangeText={props.onChangeTextInput || (() => {})}
          value={props.textInputValue}
          onSubmitEditing={props.onSubmitEditinTextInput || (() => {})}
        />
        <TouchableOpacity onPress={props.onPressSearchButton || (() => {})}>
          <Search width={35} height={35} fill={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default React.memo(ProductCard);

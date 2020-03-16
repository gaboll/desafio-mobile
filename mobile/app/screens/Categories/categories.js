import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';

import ArrowBack from '../../assets/icons/ArrowBack.svg';

const Categories = ({route, navigation}) => {
  const {categoryList} = route.params;

  const [subCategoryList, setSubCategoryList] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const RenderCategory = data => {
    const {item} = data.data;
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => {
            console.log(categoryList);
            setSubCategoryList(item.SubCategories);
            setModalTitle(item.Name);
            setModalIsVisible(true);
          }}>
          <View style={styles.drawCircle} />
          <Text style={styles.categoryText}>{item.Name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const RenderSubCategory = data => {
    const {item} = data.data;
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.touchableStyle} onPress={() => {}}>
          <View style={styles.drawCircle} />
          <Text style={styles.categoryText}>{item.Name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const closeModal = () => {
    setSubCategoryList([]);
    setModalTitle('');
    setModalIsVisible(false);
  };

  const RenderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.menuButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              if (modalIsVisible) {
                closeModal();
              } else {
                navigation.goBack();
              }
            }}>
            <ArrowBack width={20} height={20} />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>
            {modalTitle ? modalTitle : 'Categorias'}
          </Text>
        </View>
      </View>
    );
  };

  const RenderCategoryPage = () => {
    return (
      <>
        <RenderHeader />
        <FlatList
          data={categoryList}
          renderItem={item => <RenderCategory data={item} />}
          keyExtractor={item => item.Id}
          contentContainerStyle={styles.container}
        />
      </>
    );
  };

  const RenderSubCategoryPage = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalIsVisible}
        onRequestClose={() => {
          closeModal();
        }}>
        <>
          <RenderHeader title={modalTitle} />
          <FlatList
            data={subCategoryList}
            renderItem={item => <RenderSubCategory data={item} />}
            keyExtractor={item => item.Id}
            contentContainerStyle={styles.container}
          />
        </>
      </Modal>
    );
  };

  return (
    <>
      <RenderCategoryPage />
      <RenderSubCategoryPage />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  cardContainer: {
    height: 50,
    marginVertical: 5,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  touchableStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawCircle: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    backgroundColor: '#EDEFF1',
  },
  categoryText: {
    fontSize: 18,
    marginLeft: 15,
    color: '#6e6e6e',
  },
  headerContainer: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    elevation: 7,
  },
  menuButtonContainer: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  titleHeader: {
    fontSize: 20,
    marginLeft: 40,
    color: 'red',
  },
});

export default Categories;

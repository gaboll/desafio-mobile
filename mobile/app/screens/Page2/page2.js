import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

const Page2 = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Page1')}>
      <Text>Go to Page 1</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Page2;

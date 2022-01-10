import React, {Component, useState, useEffect, useFocusEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
const Item = ({onPress, text, itemAdd}) => {
  const color = itemAdd ? '#8A8A8A' : 'black';
  const borderWidth = itemAdd ? 0 : 0.8;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, {borderWidth}]}>
      <Text style={[styles.titleText, {color}]}>{text}</Text>
    </TouchableOpacity>
  );
};
export default DoingScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const addItem = () => {
    console.log(data);
    navigation.navigate('Input Screen');
  };
  const getData = async () => {
    try {
      data.length = 0;
      const keys = await AsyncStorage.getAllKeys();
      for (x in keys) {
        objItem = await AsyncStorage.getItem(keys[x]);
        objItemConverted = JSON.parse(objItem);
        objItemConverted.key = keys[x];
        //Add item to array setState Hook
        if (objItemConverted.status === 'Doing')
          setData(prevData => [...prevData, objItemConverted]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    getData();
  }, [isFocused]);
  const navigateDetailScreen = id => {
    navigation.navigate('Details Screen', {key: id});
  };
  const renderItem = ({item}) => {
    return (
      <Item text={item.name} onPress={() => navigateDetailScreen(item.key)} />
    );
  };
  // Sort data
  data.sort(function (a, b) {
    return parseInt(a.key) > parseInt(b.key);
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={data}
        extraData={data}
        renderItem={renderItem}
        ListFooterComponent={
          <Item itemAdd text="+ New" onPress={() => addItem()}></Item>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  list: {},
  item: {
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  titleText: {fontSize: 18},
});

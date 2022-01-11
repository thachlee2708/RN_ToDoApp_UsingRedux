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
  const [data2, setData2] = useState([]);
  const addItem = () => {
    console.log(data2);
    navigation.navigate('Input Screen', {screen: 'Completed'});
  };
  const getData = async () => {
    try {
      data2.length = 0;
      const keys = await AsyncStorage.getAllKeys();
      for (let x in keys) {
        objItem = await AsyncStorage.getItem(keys[x]);
        objItemConverted = JSON.parse(objItem);
        objItemConverted.key = keys[x];
        //Add item to array setState Hook
        if (objItemConverted.status === 'Completed')
          setData2(prevData => [...prevData, objItemConverted]);
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
    navigation.navigate('Details Screen', {key: id, screen: 'Completed'});
  };
  const renderItem = ({item}) => {
    return (
      <Item text={item.name} onPress={() => navigateDetailScreen(item.key)} />
    );
  };
  // Sort data
  data2.sort(function (a, b) {
    return parseInt(a.key) > parseInt(b.key);
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={data2}
        extraData={data2}
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

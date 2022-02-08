import React, {useState, useEffect} from 'react';
import Item from '../Item/Item';
import {Alert, AsyncStorage} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DoingScreen from './DoingScreen';
Icon.loadFont();

export default DoingContainer = ({navigation}) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    let data1 = [];
    try {
      const keys = await AsyncStorage.getAllKeys();
      for (let x in keys) {
        objItem = await AsyncStorage.getItem(keys[x]);
        objItemConverted = JSON.parse(objItem);
        objItemConverted.key = keys[x];
        if (objItemConverted.status === 'Doing') data1.push(objItemConverted);
      }
      setData(data1);
    } catch (error) {
      console.error(error);
    }
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    getData();
  }, [isFocused]);
  const navigateDetailScreen = id => {
    navigation.navigate('Details Screen', {key: id, previousScreen: 'Doing'});
  };
  const renderItem = ({item}) => {
    const removeItem = async key => {
      try {
        await AsyncStorage.removeItem(key);
        getData();
        return true;
      } catch (exception) {
        return false;
      }
    };
    const twoOptionAlertHandler = id => {
      Alert.alert(
        //title
        'Xác nhận xoá',
        //body
        'Bạn có muốn xoá ?',
        [
          {text: 'Yes', onPress: () => removeItem(id)},
          {
            text: 'No',
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    };
    const onPressSwitch = key => {
      item.status === 'Doing'
        ? (item.status = 'Completed')
        : (item.status = 'Doing');
      AsyncStorage.setItem(key, JSON.stringify(item));
      getData();
    };
    return (
      <Item
        item={item}
        text={item.name}
        id={item.key}
        onPress={() => navigateDetailScreen(item.key)}
        onPressDelete={() => twoOptionAlertHandler(item.key)}
        status={item.status}
        refresh={() => getData()}
        switchStatus={() => onPressSwitch(item.key)}
      />
    );
  };
  // Sort data
  data.sort(function (a, b) {
    return parseInt(a.key) > parseInt(b.key);
  });
  const doingProps = {
    data,
    renderItem,
  };
  return <DoingScreen {...doingProps} />;
};

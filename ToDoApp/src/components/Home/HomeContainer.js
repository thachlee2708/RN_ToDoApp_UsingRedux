import React from 'react';
import {Alert} from 'react-native';
import Item from '../Item';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './HomeScreen';
Icon.loadFont();

export default HomeContainer = ({
  navigation,
  list,
  changeDataList,
  updateDataList,
}) => {
  const addItem = () => {
    navigation.navigate('Input Screen', {previousScreen: 'Home'});
  };
  const navigateDetailScreen = item => {
    navigation.navigate('Details Screen', {
      item: item,
      previousScreen: 'Home',
    });
  };
  const removeItem = key => {
    try {
      let arrTemp = list;
      arrTemp = arrTemp.filter(e => e.key != key);
      changeDataList(arrTemp);
      return true;
    } catch (exception) {
      return false;
    }
  };
  const renderItem = ({item}) => {
    const twoOptionAlertHandler = () => {
      Alert.alert(
        //title
        'Xác nhận xoá',
        //body
        'Bạn có muốn xoá ?',
        [
          {text: 'Yes', onPress: () => removeItem(item.key)},
          {
            text: 'No',
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    };
    const onPressSwitch = key => {
      let arrTemp = list;
      for (var index in arrTemp) {
        if (arrTemp[index].key === key) {
          arrTemp[index].status === 'Doing'
            ? (arrTemp[index].status = 'Completed')
            : (arrTemp[index].status = 'Doing');
        }
      }
      updateDataList(arrTemp);
    };
    return (
      <Item
        item={item}
        text={item.name}
        id={item.key}
        onPress={() => navigateDetailScreen(item)}
        onPressDelete={() => twoOptionAlertHandler()}
        status={item.status}
        switchStatus={() => onPressSwitch(item.key)}
      />
    );
  };
  const homeProps = {list, renderItem, addItem};
  return <HomeScreen {...homeProps} />;
};

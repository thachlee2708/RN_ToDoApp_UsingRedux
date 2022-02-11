import React from 'react';
import Item from '../Item';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CompletedScreen from './CompletedScreen';
Icon.loadFont();

export default CompletedContainer = ({
  navigation,
  list,
  changeDataList,
  updateDataList,
}) => {
  const navigateDetailScreen = item => {
    navigation.navigate('Details Screen', {
      item: item,
      previousScreen: 'Completed',
    });
  };
  const renderItem = ({item}) => {
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
        onPressDelete={() => twoOptionAlertHandler(item.key)}
        status={item.status}
        switchStatus={() => onPressSwitch(item.key)}
      />
    );
  };
  const completedProps = {
    list,
    renderItem,
  };
  return <CompletedScreen {...completedProps} />;
};

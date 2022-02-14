import React, {useState} from 'react';
import {Alert} from 'react-native';
import DetailsScreen from './DetailsScreen';
export default DetailsContainer = ({
  navigation,
  route,
  props,
  list,
  changeDataList,
  updateDataList,
}) => {
  const {item} = route.params;
  const [name, setName] = useState(item.name);
  const [detail, setDetail] = useState(item.detail);
  const [time, setTime] = useState(item.time);
  const timePicked = new Date();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(item.status);

  const {previousScreen} = route.params;
  const screenNavigate = previousScreen => {
    if (previousScreen === 'Doing') return 'Doing Screen';
    if (previousScreen === 'Completed') return 'Completed Screen';
    if (previousScreen === 'Home') return 'Home Screen';
  };
  const obj = {
    name: name,
    detail: detail,
    time: time,
    status: status,
    key: item.key,
  };
  const saveData = () => {
    let arrTemp = list;
    for (var index in arrTemp) {
      if (arrTemp[index].key === item.key) {
        arrTemp[index] = obj;
      }
    }
    updateDataList(arrTemp);
    console.log(list);
    navigation.navigate(screenNavigate(previousScreen));
  };
  const optionAlertHandler = () => {
    Alert.alert(
      //title
      'Cảnh báo!',
      //body
      'Tên công việc không được để trống!',
      [
        {
          text: 'OK',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };
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
  const removeItem = key => {
    try {
      let arrTemp = list;
      arrTemp = arrTemp.filter(e => e.key != key);
      changeDataList(arrTemp);
      navigation.navigate(screenNavigate(previousScreen));
      return true;
    } catch (exception) {
      return false;
    }
  };
  const detailsProps = {
    name,
    setName,
    detail,
    setDetail,
    time,
    setTime,
    timePicked,
    status,
    setStatus,
    saveData,
    twoOptionAlertHandler,
    optionAlertHandler,
    open,
    setOpen,
    props,
  };
  return <DetailsScreen {...detailsProps} />;
};

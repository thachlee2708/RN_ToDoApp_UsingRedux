import React, {useState, useEffect} from 'react';
import {AsyncStorage, Alert} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import DetailsScreen from './DetailsScreen';
export default DetailsContainer = ({navigation, route, props}) => {
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [time, setTime] = useState('');
  const timePicked = new Date();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const {key} = route.params;
  const {previousScreen} = route.params;
  const screenNavigate = previousScreen => {
    if (previousScreen === 'Doing') return 'Doing Screen';
    if (previousScreen === 'Completed') return 'Completed Screen';
    if (previousScreen === 'Home') return 'Home Screen';
  };
  const getData = async () => {
    try {
      const objItem = await AsyncStorage.getItem(key);
      setName(JSON.parse(objItem).name);
      setDetail(JSON.parse(objItem).detail);
      setTime(JSON.parse(objItem).time);
      setStatus(JSON.parse(objItem).status);
    } catch (error) {
      console.error(error);
    }
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    getData();
  }, [isFocused]);
  const obj = {
    name: name,
    detail: detail,
    time: time,
    status: status,
  };
  const saveData = () => {
    if (obj.name === '') return optionAlertHandler();
    AsyncStorage.setItem(key, JSON.stringify(obj));
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
        {text: 'Yes', onPress: () => removeItem()},
        {
          text: 'No',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };
  const removeItem = async () => {
    try {
      await AsyncStorage.removeItem(key);
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

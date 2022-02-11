import React, {useState} from 'react';
import {AsyncStorage, Alert} from 'react-native';
import InputScreen from './InputScreen';
export default InputContainer = ({
  navigation,
  route,
  props,
  list,
  changeDataList,
}) => {
  const {previousScreen} = route.params;
  const screenNavigate = previousScreen => {
    if (previousScreen === 'Doing') return 'Doing Screen';
    if (previousScreen === 'Completed') return 'Completed Screen';
    return 'Home Screen';
  };
  const generateNextKey = () => {
    try {
      var arrList = list;
      if (obj.name === '') return optionAlertHandler('Bạn hãy nhập công việc');
      if (obj.status === '')
        return optionAlertHandler('Bạn hãy nhập trạng thái công việc');
      arrList = arrList.push(obj);
      console.log(list);
      navigation.navigate(screenNavigate(previousScreen));
    } catch (error) {
      console.error(error);
    }
  };
  const optionAlertHandler = text => {
    Alert.alert(
      //title
      'Cảnh báo!',
      //body
      text,
      [
        {
          text: 'OK',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('');
  const timePicked = new Date();
  const [open, setOpen] = useState(false);
  const obj = {
    name: name,
    detail: detail,
    time: time,
    status: status,
    key: list.length,
  };
  const inputProps = {
    setName,
    setDetail,
    time,
    setTime,
    status,
    setStatus,
    timePicked,
    open,
    setOpen,
    generateNextKey,
    props,
  };
  return <InputScreen {...inputProps} />;
};

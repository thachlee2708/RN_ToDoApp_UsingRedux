import React, {useState} from 'react';
import {Alert} from 'react-native';
import InputScreen from './InputScreen';
export default InputContainer = ({
  navigation,
  route,
  props,
  list,
  updateDataList,
}) => {
  const {previousScreen} = route.params;
  const screenNavigate = previousScreen => {
    if (previousScreen === 'Doing') return 'Doing Screen';
    if (previousScreen === 'Completed') return 'Completed Screen';
    return 'Home Screen';
  };
  var keys = list.map(function (i) {
    return i.key;
  });
  const maxKey = Math.max(...keys);
  const generateNextKey = () => {
    try {
      let arrList = list;
      if (obj.name === '') return optionAlertHandler('Bạn hãy nhập công việc');
      if (obj.status === '')
        return optionAlertHandler('Bạn hãy nhập trạng thái công việc');
      arrList = arrList.push(obj);
      updateDataList(arrList);
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
    key: maxKey + 1,
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

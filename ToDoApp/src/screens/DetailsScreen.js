import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  Alert,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
export default DetailsScreen = ({navigation, route}) => {
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
    AsyncStorage.setItem(key, JSON.stringify(obj));
    navigation.navigate(screenNavigate(previousScreen));
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
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Tên công việc:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setName}
        value={name}></TextInput>
      <Text style={styles.text}>Nội dung công việc:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setDetail}
        value={detail}></TextInput>
      <Text style={styles.text}>Thời gian bắt đầu:</Text>
      <Text
        editable={false}
        style={styles.textInput}
        onPress={() => setOpen(true)}>
        {time}
      </Text>
      <DatePicker
        modal
        open={open}
        date={timePicked}
        onConfirm={timePicked => {
          setOpen(false);
          setTime(
            timePicked.toLocaleTimeString().slice(0, 5) +
              timePicked.toLocaleTimeString().slice(8, 11) +
              ' ' +
              timePicked.toLocaleDateString(),
          );
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Text style={styles.text}>Trạng thái công việc:</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        placeholder={{}}
        value={status}
        items={[
          {label: 'Doing', value: 'Doing'},
          {label: 'Completed', value: 'Completed'},
        ]}
        onValueChange={setStatus}
      />
      <TouchableOpacity style={styles.wrapButton} onPress={() => saveData()}>
        <Text style={styles.text}>Lưu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.wrapButton}
        onPress={() => twoOptionAlertHandler()}>
        <Text style={styles.text}>Xoá</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  text: {
    padding: 10,
    fontSize: 15,
  },
  textInput: {
    padding: 10,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
  wrapButton: {
    borderRadius: 5,
    marginTop: 30,
    marginHorizontal: 50,
    backgroundColor: '#EDF005',
    alignItems: 'center',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

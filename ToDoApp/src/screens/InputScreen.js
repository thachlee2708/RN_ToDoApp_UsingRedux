import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  Alert,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';
export default InputScreen = ({navigation, route}) => {
  const {previousScreen} = route.params;
  const screenNavigate = previousScreen => {
    if (previousScreen === 'Doing') return 'Doing Screen';
    if (previousScreen === 'Completed') return 'Completed Screen';
    return 'Home Screen';
  };
  const generateNextKey = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      var sumKey = 1;
      for (x in keys) {
        sumKey = sumKey + parseInt(keys[x]);
      }
      if (obj.name === '') return optionAlertHandler('Bạn hãy nhập công việc');
      if (obj.status === '')
        return optionAlertHandler('Bạn hãy nhập trạng thái công việc');
      AsyncStorage.setItem(sumKey + '', JSON.stringify(obj));
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
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Tên công việc:</Text>
      <TextInput style={styles.textInput} onChangeText={setName}></TextInput>
      <Text style={styles.text}>Nội dung công việc:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setDetail}
        multiline={true}
        numberOfLines={5}></TextInput>
      <Text style={styles.text}>Thời gian bắt đầu:</Text>
      <Text onPress={() => setOpen(true)} style={styles.textInput}>
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
        useNativeAndroidPickerStyle={false}
        style={
          Platform.OS === 'android'
            ? {
                inputAndroid: {
                  color: 'black',
                  fontSize: 20,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingRight: 30,
                },
              }
            : {
                inputIOS: {
                  color: 'black',
                  fontSize: 20,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingRight: 30,
                },
              }
        }
        label="Select status..."
        value={status}
        items={[
          {label: 'Doing', value: 'Doing'},
          {label: 'Completed', value: 'Completed'},
        ]}
        onValueChange={setStatus}
      />
      <TouchableOpacity
        style={styles.wrapButton}
        onPress={() => generateNextKey()}>
        <Text style={styles.text}>Lưu</Text>
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
    margin: 50,
    backgroundColor: '#EDF005',
    alignItems: 'center',
  },
});

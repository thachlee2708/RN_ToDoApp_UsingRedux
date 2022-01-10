import React, {Component, useState, useEffect} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
export default InputScreen = ({navigation}) => {
  const generateNextKey = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      var sumKey = 1;
      for (x in keys) {
        sumKey = sumKey + parseInt(keys[x]);
      }
      console.log(sumKey);
      AsyncStorage.setItem(sumKey + '', JSON.stringify(obj));
      navigation.navigate('Home Screen');
    } catch (error) {
      console.error(error);
    }
  };
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [time, setTime] = useState('');
  const timePicked = new Date();
  const [open, setOpen] = useState(false);
  const obj = {
    name: name,
    detail: detail,
    time: time,
    status: 'Doing',
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Tên công việc:</Text>
      <TextInput style={styles.textInput} onChangeText={setName}></TextInput>
      <Text style={styles.text}>Nội dung công việc:</Text>
      <TextInput style={styles.textInput} onChangeText={setDetail}></TextInput>
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

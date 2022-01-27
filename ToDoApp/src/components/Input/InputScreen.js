import React from 'react';
import {Platform, Text, TouchableOpacity, TextInput} from 'react-native';
import {styles, inputAndroid, inputIOS} from './_style';
import {SafeAreaView} from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';
export default InputScreen = ({
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
}) => {
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
        style={Platform.OS === 'android' ? {inputAndroid} : {inputIOS}}
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

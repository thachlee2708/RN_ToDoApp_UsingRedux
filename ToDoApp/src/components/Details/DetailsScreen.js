import React from 'react';
import {styles, inputAndroid, inputIOS} from './_style';
import {Text, TouchableOpacity, Platform, TextInput} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {SafeAreaView} from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
export default DetailsScreen = ({
  name,
  setName,
  detail,
  setDetail,
  time,
  timePicked,
  setTime,
  status,
  setStatus,
  saveData,
  twoOptionAlertHandler,
  open,
  setOpen,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Tên công việc:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setName}
        value={name}></TextInput>
      <Text style={styles.text}>Nội dung công việc:</Text>
      <TextInput
        multiline={true}
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
        useNativeAndroidPickerStyle={false}
        style={
          Platform.OS === 'android'
            ? {
                inputAndroid,
              }
            : {
                inputIOS,
              }
        }
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

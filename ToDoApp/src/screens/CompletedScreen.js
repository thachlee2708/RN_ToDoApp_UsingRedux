import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
const Item = ({
  item,
  onPress,
  text,
  itemAdd,
  onPressDelete,
  status,
  id,
  refresh,
  switchStatus,
}) => {
  const color = itemAdd ? '#8A8A8A' : 'black';
  const borderWidth = itemAdd ? 0 : 0.8;
  const [statusTemp, setStatusTemp] = useState(status);
  const onSwitch = () => {
    item.status = statusTemp;
    AsyncStorage.setItem(id, JSON.stringify(item));
    refresh();
  };
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, {borderWidth}]}>
      <Text style={[styles.titleText, {color, flex: 1}]}>{text}</Text>
      {!itemAdd && (
        <View style={{justifyContent: 'center'}}>
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            style={
              Platform.OS === 'android'
                ? {
                    inputAndroid: {
                      color: 'black',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 0,
                      fontSize: 12,
                      borderWidth: 1,
                      borderRadius: 5,
                    },
                  }
                : {
                    inputIOS: {
                      color: 'black',
                      justifyContent: 'center',
                      fontSize: 12,
                      padding: 5,
                      borderWidth: 1,
                      borderRadius: 5,
                    },
                  }
            }
            placeholder={{}}
            value={statusTemp}
            items={[
              {label: 'Doing', value: 'Doing'},
              {label: 'Completed', value: 'Completed'},
            ]}
            onValueChange={Platform.OS === 'ios' ? setStatusTemp : switchStatus}
            onClose={Platform.OS === 'ios' ? () => onSwitch() : null}
          />
        </View>
      )}
      {!itemAdd && (
        <TouchableOpacity onPress={onPressDelete} style={{padding: 10}}>
          <Icon name="trash" size={20} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
export default CompletedScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    let data1 = [];
    try {
      const keys = await AsyncStorage.getAllKeys();
      for (let x in keys) {
        objItem = await AsyncStorage.getItem(keys[x]);
        objItemConverted = JSON.parse(objItem);
        objItemConverted.key = keys[x];
        if (objItemConverted.status === 'Completed')
          data1.push(objItemConverted);
      }
      setData(data1);
    } catch (error) {
      console.error(error);
    }
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    getData();
  }, [isFocused]);
  const navigateDetailScreen = id => {
    navigation.navigate('Details Screen', {key: id, previousScreen: 'Doing'});
  };
  const renderItem = ({item}) => {
    const removeItem = async key => {
      try {
        await AsyncStorage.removeItem(key);
        getData();
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
      item.status === 'Doing'
        ? (item.status = 'Completed')
        : (item.status = 'Doing');
      AsyncStorage.setItem(key, JSON.stringify(item));
      getData();
    };
    return (
      <Item
        item={item}
        text={item.name}
        id={item.key}
        onPress={() => navigateDetailScreen(item.key)}
        onPressDelete={() => twoOptionAlertHandler(item.key)}
        status={item.status}
        refresh={() => getData()}
        switchStatus={() => onPressSwitch(item.key)}
      />
    );
  };
  // Sort data
  data.sort(function (a, b) {
    return parseInt(a.key) > parseInt(b.key);
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={data}
        extraData={data}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  list: {},
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  titleText: {fontSize: 18},
});

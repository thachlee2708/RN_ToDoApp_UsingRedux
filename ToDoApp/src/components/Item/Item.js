import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  AsyncStorage,
} from 'react-native';
import {styles, inputAndroid, inputIOS} from './_style';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
export default Item = ({
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
                    inputAndroid,
                  }
                : {
                    inputIOS,
                  }
            }
            placeholder={{}}
            value={Platform.OS === 'ios' ? statusTemp : status}
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

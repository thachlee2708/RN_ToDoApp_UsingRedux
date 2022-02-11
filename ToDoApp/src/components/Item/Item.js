import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from './_style';
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
  list,
  changeDataList,
}) => {
  const color = itemAdd ? '#8A8A8A' : 'black';
  const borderWidth = itemAdd ? 0 : 0.8;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, {borderWidth}]}>
      <Text style={[styles.titleText, {color, flex: 1}]}>{text}</Text>
      {!itemAdd && (
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity onPress={switchStatus}>
            <Text style={{padding: 5, color: 'black'}}>{item.status}</Text>
          </TouchableOpacity>
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

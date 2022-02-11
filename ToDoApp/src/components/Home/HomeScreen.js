import React from 'react';
import {styles} from './_style';
import {FlatList, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Item from '../Item/Item';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

export default HomeScreen = ({list, renderItem, addItem}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{alignSelf: 'center', fontStyle: 'italic', color: 'grey'}}>
        *Use Redux*
      </Text>
      <FlatList
        data={list}
        extraData={list}
        renderItem={renderItem}
        ListFooterComponent={
          <Item itemAdd text="+ New" onPress={() => addItem()}></Item>
        }
      />
    </SafeAreaView>
  );
};

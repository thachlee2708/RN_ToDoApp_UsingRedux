import React from 'react';
import {styles} from './_style';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Item from '../Item/Item';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

export default HomeScreen = ({data, renderItem, addItem}) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        extraData={data}
        renderItem={renderItem}
        ListFooterComponent={
          <Item itemAdd text="+ New" onPress={() => addItem()}></Item>
        }
      />
    </SafeAreaView>
  );
};

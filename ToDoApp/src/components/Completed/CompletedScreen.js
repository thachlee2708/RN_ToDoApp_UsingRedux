import React from 'react';
import {styles} from './_style';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

export default CompletedScreen = ({list, renderItem}) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={list.filter(e => e.status === 'Completed')}
        extraData={list}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

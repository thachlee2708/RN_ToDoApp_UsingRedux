import React from 'react';
import {styles} from './_style';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
export default CompletedScreen = ({data, renderItem}) => {
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

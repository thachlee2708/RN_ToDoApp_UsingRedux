import React from 'react';
import {StatusBar, StyleSheet, Dimensions, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
StatusBar.setHidden(true);
const height = Dimensions.get('screen').height;
export default SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>TO DO APP</Text>
      <Icon name="calendar" size={30} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 40,
    fontStyle: 'italic',
    margin: 10,
  },
});

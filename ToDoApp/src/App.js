import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import InputScreen from './screens/InputScreen';
import DetailsScreen from './screens/DetailsScreen';
import DoingScreen from './screens/DoingScreen';
import CompletedScreen from './screens/CompletedScreen';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" unmount>
        <Stack.Screen name="Home Screen" component={HomeScreen} />
        <Stack.Screen name="Input Screen" component={InputScreen} />
        <Stack.Screen name="Details Screen" component={DetailsScreen} />
        <Stack.Screen name="Doing Screen" component={DoingScreen} />
        <Stack.Screen name="Completed Screen" component={CompletedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

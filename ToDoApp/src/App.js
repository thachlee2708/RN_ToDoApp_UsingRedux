import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import InputScreen from './screens/InputScreen';
import DetailsScreen from './screens/DetailsScreen';
import DoingScreen from './screens/DoingScreen';
import CompletedScreen from './screens/CompletedScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const DoingStack = createNativeStackNavigator();
const CompletedStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home Screen"
        component={HomeScreen}></HomeStack.Screen>
      <HomeStack.Screen
        name="Input Screen"
        component={InputScreen}></HomeStack.Screen>
      <HomeStack.Screen
        name="Details Screen"
        component={DetailsScreen}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
}
function DoingStackScreen() {
  return (
    <DoingStack.Navigator>
      <DoingStack.Screen
        name="Doing Screen"
        component={DoingScreen}></DoingStack.Screen>
      <DoingStack.Screen
        name="Input Screen"
        component={InputScreen}></DoingStack.Screen>
      <DoingStack.Screen
        name="Details Screen"
        component={DetailsScreen}></DoingStack.Screen>
    </DoingStack.Navigator>
  );
}
function CompletedStackScreen() {
  return (
    <CompletedStack.Navigator>
      <CompletedStack.Screen
        name="Completed Screen"
        component={CompletedScreen}></CompletedStack.Screen>
      <CompletedStack.Screen
        name="Input Screen"
        component={InputScreen}></CompletedStack.Screen>
      <CompletedStack.Screen
        name="Details Screen"
        component={DetailsScreen}></CompletedStack.Screen>
    </CompletedStack.Navigator>
  );
}
function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Home Screen" component={HomeStackScreen} />
        <Tab.Screen name="Doing Screen" component={DoingStackScreen} />
        <Tab.Screen name="Completed Screen" component={CompletedStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

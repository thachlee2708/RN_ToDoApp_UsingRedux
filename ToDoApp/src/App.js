import React, {useEffect, useState} from 'react';
import RootStack from './RootStack';
import SplashScreen from './components/SplashScreen';
import {StatusBar} from 'react-native';
export default App = () => {
  const [showSplashScreen, setShowSlpashScreen] = useState(true);
  useEffect(() => {
    setTimeout(function () {
      setShowSlpashScreen(false);
      StatusBar.setHidden(false);
    }, 1500);
  }, []);
  return showSplashScreen ? <SplashScreen /> : <RootStack />;
};

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import MainStackContainer from './routes/MainStackNavigator';

const AppStart = () => {
  return (
    <NavigationContainer>
      <MainStackContainer></MainStackContainer>
    </NavigationContainer>
  );
};

export default AppStart;

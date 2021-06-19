import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Recorder from '../screens/Recorder';
import AudioRecorderPlayer from '../screens/AudioRecorderPlayer';

const Stack = createStackNavigator();

function MainStackContainer() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="AudioRecorderPlayer">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Recorder" component={Recorder} />
      <Stack.Screen
        name="AudioRecorderPlayer"
        component={AudioRecorderPlayer}
      />
    </Stack.Navigator>
  );
}

export default MainStackContainer;

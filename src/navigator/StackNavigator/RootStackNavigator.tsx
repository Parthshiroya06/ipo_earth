import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen, SplashScreen} from '@screen';
import {RootStackParamList} from '@types';
import {BottomTabNavigator} from 'navigator/BottomTabNavigator';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Group screenOptions={{headerShown: false}}>
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen name="BottomTabBar" component={BottomTabNavigator} />
    </RootStack.Group>
  );
};

export {RootStackNavigator};

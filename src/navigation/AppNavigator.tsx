import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Auth/Login';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import ChangePassword from '../screens/Auth/ChangePassword';
import HomeScreen from '../screens/App/Home';

export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  ChangePassword: { token: string };
};

export type AppStackParamList = {
  Home: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
          {isAuthenticated ? (
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
              <AppStack.Screen name="Home" component={HomeScreen} />
            </AppStack.Navigator>
          ) : (
            <AuthStack.Navigator screenOptions={{ headerShown: false }}>
              <AuthStack.Screen name="Login" component={Login} />
              <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
              <AuthStack.Screen name="ChangePassword" component={ChangePassword} />
            </AuthStack.Navigator>
          )}
    </NavigationContainer>
);
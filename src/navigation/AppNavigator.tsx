import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/Auth/LoginScreen';
// import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
// import ChangePasswordScreen from '../screens/Auth/ChangePasswordScreen';

export type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  ChangePassword: { token: string }; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
        {/* <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
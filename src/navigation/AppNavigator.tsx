import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Auth/Login';
import ForgotPassword from '../screens/Auth/ForgotPassword';
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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        {/* <Stack.Screen name="ChangePassword" component={ChangePassword} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

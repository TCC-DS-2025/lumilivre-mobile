import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';

import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/Auth/Login';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword';
import ChangePasswordScreen from '../screens/Auth/ChangePassword';

import TabNavigator from './TabNavigator';

export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  ChangePassword: { token: string };
};

export type AppStackParamList = {
  MainTabs: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  const { isAuthenticated, isGuest, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#762075" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated || isGuest ? (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          <AppStack.Screen name="MainTabs" component={TabNavigator} />
        </AppStack.Navigator>
      ) : (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <AuthStack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text, View } from 'react-native';

import HomeScreen from '../screens/App/Home';
import SearchScreen from '../screens/App/Search';
import ProfileScreen from '../screens/App/Profile';

const homeIcon = require('../assets/images/icons/home.png');
const homeActiveIcon = require('../assets/images/icons/home-active.png');
const searchIcon = require('../assets/images/icons/search.png');
const searchActiveIcon = require('../assets/images/icons/search-active.png');
const profileIcon = require('../assets/images/icons/profile.png');
const profileActiveIcon = require('../assets/images/icons/profile-active.png');

export type TabParamList = {
  Search: undefined;
  Home: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabBarItem = ({ focused, activeIcon, inactiveIcon, label }: any) => (
  <View style={styles.tabItemContainer}>
    <Image
      source={focused ? activeIcon : inactiveIcon}
      style={[styles.icon, { tintColor: focused ? '#FFFFFF' : '#C9C9C9' }]}
      resizeMode="contain"
    />
    <Text style={[styles.label, { color: focused ? '#FFFFFF' : '#C9C9C9' }]}>
      {label}
    </Text>
  </View>
);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarItem
              focused={focused}
              activeIcon={searchActiveIcon}
              inactiveIcon={searchIcon}
              label="Livros" 
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarItem
              focused={focused}
              activeIcon={homeActiveIcon}
              inactiveIcon={homeIcon}
              label="Catálogo" 
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarItem
              focused={focused}
              activeIcon={profileActiveIcon}
              inactiveIcon={profileIcon}
              label="Perfil" 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    paddingTop: 15,
    backgroundColor: '#762075', 
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  tabItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 5,
  },
  icon: {
    width: 32, 
    height: 32,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});
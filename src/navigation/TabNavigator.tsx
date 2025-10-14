import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View, Animated } from 'react-native';

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

const TabBarIcon = ({ focused, activeIcon, inactiveIcon }: any) => {
  const scale = new Animated.Value(focused ? 1.2 : 1);

  Animated.spring(scale, {
    toValue: focused ? 1.2 : 1,
    friction: 4,
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Image
        source={focused ? activeIcon : inactiveIcon}
        style={styles.icon}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

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
            <TabBarIcon
              focused={focused}
              activeIcon={searchActiveIcon}
              inactiveIcon={searchIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.homeIconContainer}>
              <TabBarIcon
                focused={focused}
                activeIcon={homeActiveIcon}
                inactiveIcon={homeIcon}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon={profileActiveIcon}
              inactiveIcon={profileIcon}
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
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 5,
    backgroundColor: '#762075',
    borderRadius: 15,
    height: 70,
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  icon: {
    width: 28,
    height: 28,
  },
  homeIconContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#762075',
    width: 70,
    height: 70,
    borderRadius: 35,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

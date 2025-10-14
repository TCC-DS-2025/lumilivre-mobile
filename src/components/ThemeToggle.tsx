import React from 'react';
import { Pressable, Image, StyleSheet } from 'react-native';

const sunIcon = require('../assets/images/icons/sun.png');
const moonIcon = require('../assets/images/icons/moon.png');

export default function ThemeToggle() {
  const isDarkMode = false;

  const handleToggle = () => {
    console.log('Trocando tema...');
  };

  return (
    <Pressable style={styles.button} onPress={handleToggle}>
      <Image
        source={isDarkMode ? sunIcon : moonIcon}
        style={styles.icon}
        resizeMode="contain"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    elevation: 3,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

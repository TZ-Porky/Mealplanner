// src/components/TabButton/TabButton.js
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './TabButtonStyles';

const TabButton = ({ title, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isActive ? styles.activeButton : styles.inactiveButton]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, isActive ? styles.activeText : styles.inactiveText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TabButton;

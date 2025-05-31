// src/components/GenerateShoppingListButton/GenerateShoppingListButton.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './GenerateShoppingListButtonStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts } from '../../styles/AppStyles';

const GenerateShoppingListButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Generate Shopping List</Text>
      <Icon name="basket-outline" size={Fonts.sizes.large} color={Colors.textLight} style={styles.buttonIcon} />
    </TouchableOpacity>
  );
};

export default GenerateShoppingListButton;

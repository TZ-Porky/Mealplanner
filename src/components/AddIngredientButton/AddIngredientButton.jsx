import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './AddIngredientButtonStyles';
import { Fonts } from '../../styles/AppStyles'; // Adaptez le chemin

const AddIngredientButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Icon name="add" size={Fonts.sizes.xLarge} style={styles.buttonIcon} />
      <Text style={styles.buttonText}>Add Ingredient</Text>
    </TouchableOpacity>
  );
};

export default AddIngredientButton;

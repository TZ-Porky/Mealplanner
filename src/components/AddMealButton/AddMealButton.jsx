import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './AddMealButtonStyles';
import { Fonts } from '../../styles/AppStyles';

const AddMealButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Icon name="add" size={Fonts.sizes.xLarge} style={styles.buttonIcon} />
      <Text style={styles.buttonText}>Add Meal</Text>
    </TouchableOpacity>
  );
};

export default AddMealButton;

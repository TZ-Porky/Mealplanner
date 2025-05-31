// src/components/RecommendButton/RecommendButton.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './RecommendButtonStyles'; // Assurez-vous d'avoir ce fichier de styles
import Icon from 'react-native-vector-icons/Ionicons'; // Importez Ionicons
import { Colors, Fonts } from '../../styles/AppStyles';

const RecommendButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Recommend me a meal</Text>
      {/* Icône étoile */}
      <Icon name="star" size={Fonts.sizes.large} color={Colors.textLight} style={styles.buttonIcon} />
    </TouchableOpacity>
  );
};

export default RecommendButton;

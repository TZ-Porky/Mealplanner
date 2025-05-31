// src/components/MealPlanCard/MealPlanCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './MealCardPlanStyles';

const MealPlanCard = ({ imageSource, mealType, description, time, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.mealType}>{mealType}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MealPlanCard;

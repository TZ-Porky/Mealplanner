import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './MealCardStyles';
import { Fonts } from '../../styles/AppStyles';

const MealCard = ({ meal, onPress }) => { // Prend un objet 'meal' complet
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => onPress(meal)}>
      <Image source={meal.image} style={styles.image} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.mealName}>{meal.name}</Text>
          {meal.tag && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{meal.tag}</Text>
            </View>
          )}
        </View>
        <Text style={styles.description}>{meal.ingredientsDesc}</Text> {/* Ex: "Ingredients" */}
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Icon name="time-outline" size={Fonts.sizes.medium} style={styles.detailIcon} />
            <Text style={styles.detailText}>{meal.time}</Text>
          </View>
          <View style={styles.detailItem}>
            {/* Si vous voulez afficher les parts comme dans Homescreen, adaptez ici */}
            {/* <Icon name="people-outline" size={Fonts.sizes.medium} style={styles.detailIcon} />
            <Text style={styles.detailText}>{meal.servings} Parts</Text> */}
          </View>
        </View>
        <View style={styles.priceRatingRow}>
          <Text style={styles.priceText}>{meal.price}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{meal.rating}</Text>
            <Icon name="star" size={Fonts.sizes.medium} style={styles.starIcon} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MealCard;

import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './MealCardStyles';
import {Fonts} from '../../styles/AppStyles';

const MealCard = ({meal, onPress}) => {
  // Accès aux propriétés renommées de l'objet meal (instance de Recette)
  const timeInHours = Math.floor(meal.preparationTimeMinutes / 60); // Renommé
  const timeInMinutes = meal.preparationTimeMinutes % 60; // Renommé
  const formattedTime =
    (timeInHours > 0 ? `${timeInHours}h ` : '') +
    (timeInMinutes > 0 ? `${timeInMinutes}min` : '');

  // Utilise la nouvelle méthode calculateTotalCost()
  const displayPrice = meal.calculateTotalCost
    ? `${meal.calculateTotalCost().toFixed(2)} XCFA`
    : 'N/A';
  // Affiche le premier tag ou la catégorie, utilise category (renommé)
  const displayTag =
    meal.tags && meal.tags.length > 0 ? meal.tags[0] : meal.category;

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => onPress(meal)}>
      <Image
        source={
          meal.imageUrl
            ? {uri: meal.imageUrl}
            : require('../../../assets/images/meal-1.png')
        }
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.mealName}>{meal.title}</Text> {/* Renommé */}
          {displayTag && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{displayTag}</Text>
            </View>
          )}
        </View>
        {/* Utilise la nouvelle propriété description */}
        <Text style={styles.description}>{meal.description}</Text>
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Icon
              name="time-outline"
              size={Fonts.sizes.medium}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>{formattedTime || 'N/A'}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon
              name="people-outline"
              size={Fonts.sizes.medium}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>{meal.servings} Portions</Text>{' '}
            {/* Renommé */}
          </View>
        </View>
        <View style={styles.priceRatingRow}>
          <Text style={styles.priceText}>{displayPrice}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              {meal.rating ? meal.rating.toFixed(1) : '0.0'}
            </Text>{' '}
            {/* Gère le cas où rating est null/undefined */}
            <Icon
              name="star"
              size={Fonts.sizes.medium}
              style={styles.starIcon}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MealCard;

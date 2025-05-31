// src/components/RecipeCard/RecipeCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './RecipeCardStyles';
import Icon from 'react-native-vector-icons/Ionicons'; // <-- Importez Ionicons
import { Colors, Fonts } from '../../styles/AppStyles'; // Pour la couleur des icônes

const RecipeCard = ({
  imageSource,
  mealName,
  time,
  price,
  rating,
  tags = [],
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>{tag}</Text>
        ))}
      </View>
      <View style={styles.content}>
        <View style={styles.detailsContainer}>
          <Text style={styles.mealName}>{mealName}</Text>
          <View style={styles.rating}>
            <Text style={styles.detailText}>{rating}</Text>
            {/* Icône étoile */}
            <Icon name="star" size={Fonts.sizes.small} color={Colors.primaryYellow} />
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            {/* Icône horloge */}
            <Icon name="time-outline" size={Fonts.sizes.small} color={Colors.textMedium} />
            <Text style={styles.detailText}>{time}</Text>
          </View>
          <View style={styles.detailItem}>
            {/* Icône argent (ou prix) */}
            <Icon name="wallet-outline" size={Fonts.sizes.small} color={Colors.textMedium} />
            <Text style={styles.detailText}>{price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard;

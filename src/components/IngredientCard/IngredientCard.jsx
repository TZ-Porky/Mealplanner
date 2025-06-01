import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './IngredientCardStyles';
import { Fonts } from '../../styles/AppStyles';

const IngredientCard = ({ ingredient, onIncrease, onDecrease, onDelete }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.image}>
        {/* L'image de l'ingrédient sera passée par la prop ingredient.image */}
        {ingredient.image && <Image source={ingredient.image} style={styles.ingredientImage} />}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.ingredientName}>{ingredient.name}</Text>
        <Text style={styles.ingredientPrice}>{ingredient.price} XCFA</Text>
      </View>
      <View style={styles.actionsContainer}>
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={() => onDecrease(ingredient.id)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          {/* Affichez la quantité actuelle de l'ingrédient */}
          <Text style={styles.quantityText}>{ingredient.quantity} Pics</Text>
          <TouchableOpacity onPress={() => onIncrease(ingredient.id)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => onDelete(ingredient.id)} style={styles.deleteButton}>
          <Icon name="trash-outline" size={Fonts.sizes.large} style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IngredientCard;

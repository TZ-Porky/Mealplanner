// src/components/IngredientCard/IngredientCard.js
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './IngredientCardStyles';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Importez Ionicons
import {Colors, Fonts} from '../../styles/AppStyles';

const IngredientCard = ({
  imageSource,
  name,
  pics,
  price,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconWrapper}>
        <Image source={imageSource} style={styles.ingredientIcon} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Icon name="box" size={Fonts.sizes.small} color={Colors.textMedium} />
          <Text style={styles.detailText}>{pics} Pics</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon
            name="money-bill"
            size={Fonts.sizes.small}
            color={Colors.textMedium}
          />
          <Text style={styles.detailText}>{price} XCFA</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default IngredientCard;

// src/components/RecipeDetailHeader/RecipeDetailHeader.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ServingsSelector from '../ServingSelector/ServingSelector';
import styles from './RecipeDetailHeaderStyles';
import { Colors, Fonts } from '../../styles/AppStyles';

const RecipeDetailHeader = ({
  imageSource,
  title,
  rating,
  time,
  price,
  onGoBack,
  onShare,
  currentServings,
  onServingsIncrease,
  onServingsDecrease,
}) => {
  return (
    <View>
      <View style={styles.headerImageContainer}>
        <Image source={imageSource} style={styles.headerImage} />
        <View style={styles.overlayButtons}>
          <TouchableOpacity style={styles.iconButton} onPress={onGoBack}>
            <Icon name="chevron-back" size={24} color={Colors.textLight} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onShare}>
            <Icon name="share-social" size={24} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.headerContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.recipeTitle}>{title}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{rating}</Text>
            <Icon name="star" size={Fonts.sizes.xLarge} color={Colors.primaryYellow} style={styles.starIcon} />
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Icon name="time-outline" size={Fonts.sizes.large} color={Colors.textMedium} style={styles.infoIcon} />
            <Text style={styles.infoText}>{time}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="people-outline" size={Fonts.sizes.large} color={Colors.textMedium} style={styles.infoIcon} />
            <ServingsSelector
                servings={currentServings}
                onIncrease={onServingsIncrease}
                onDecrease={onServingsDecrease}
            />
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Icon name="wallet-outline" size={Fonts.sizes.large} color={Colors.textDark} style={styles.priceIcon} />
          <Text style={styles.priceText}>{price}</Text>
        </View>
      </View>
    </View>
  );
};

export default RecipeDetailHeader;

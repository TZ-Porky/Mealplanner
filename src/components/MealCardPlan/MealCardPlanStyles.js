// src/components/MealPlanCard/MealPlanCardStyles.js
import { StyleSheet } from 'react-native';
import { Colors, Layout, Fonts, GlobalStyles } from '../../styles/AppStyles';

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBackground,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.medium,
    marginBottom: Layout.spacing.medium,
    alignItems: 'center',
    ...GlobalStyles.shadow,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: Layout.borderRadius.small,
    marginRight: Layout.spacing.medium,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1, // Prend l'espace restant
  },
  mealType: {
    fontSize: Fonts.sizes.xLarge,
    fontWeight: Fonts.weights.bold,
    color: Colors.textDark,
    marginBottom: Layout.spacing.xSmall / 2,
  },
  description: {
    fontSize: Fonts.sizes.medium,
    color: Colors.textMedium,
    marginBottom: Layout.spacing.small,
  },
  time: {
    fontSize: Fonts.sizes.small,
    color: Colors.primaryOrange,
    fontWeight: Fonts.weights.semiBold,
  },
});

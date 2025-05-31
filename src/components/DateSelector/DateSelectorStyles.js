// src/components/DateSelector/DateSelectorStyles.js
import { StyleSheet } from 'react-native';
import { Colors, Layout, Fonts } from '../../styles/AppStyles';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.medium,
    // Permet le défilement horizontal si le contenu dépasse
    paddingVertical: Layout.spacing.small,
  },
  dateItem: {
    paddingVertical: Layout.spacing.small,
    paddingHorizontal: Layout.spacing.medium,
    borderRadius: Layout.borderRadius.medium,
    backgroundColor: Colors.cardBackground,
    alignItems: 'center',
    marginRight: Layout.spacing.small, // Espace entre les dates
  },
  activeDateItem: {
    backgroundColor: Colors.primaryOrange,
  },
  dayText: {
    fontSize: Fonts.sizes.medium,
    color: Colors.textMedium,
    fontWeight: Fonts.weights.medium,
    marginBottom: Layout.spacing.xSmall / 2,
  },
  activeDayText: {
    color: Colors.textLight,
  },
  dateText: {
    fontSize: Fonts.sizes.xLarge,
    color: Colors.textDark,
    fontWeight: Fonts.weights.bold,
  },
  activeDateText: {
    color: Colors.textLight,
  },
});

import { StyleSheet } from 'react-native';
import { Colors, Fonts, Layout } from '../../styles/AppStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blankBackground,
  },
  greetingSection: {
    paddingHorizontal: Layout.spacing.medium,
    marginBottom: Layout.spacing.medium,
  },
  browseTitle: {
    fontSize: Fonts.sizes.xxLarge,
    fontWeight: Fonts.weights.bold,
    color: Colors.textDark,
  },
  browseMealHighlight: {
    color: Colors.primaryOrange,
  },
  browseSubtitle: {
    fontSize: Fonts.sizes.medium,
    color: Colors.textMedium,
    marginTop: Layout.spacing.xSmall,
  },
  mealSection: {
    marginBottom: Layout.spacing.large,
  },
  mealSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.medium,
    marginBottom: Layout.spacing.small,
  },
  mealSectionTitle: {
    fontSize: Fonts.sizes.xLarge,
    fontWeight: Fonts.weights.bold,
    color: Colors.textDark,
  },
  addMealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.small,
    paddingVertical: Layout.spacing.xSmall,
  },
  addMealButtonText: {
    color: Colors.primaryOrange,
    fontSize: Fonts.sizes.medium,
    fontWeight: Fonts.weights.bold,
    marginRight: Layout.spacing.xSmall / 2,
  },
  addMealIcon: {
    color: Colors.primaryOrange,
  },
  flatListContentContainer: {
    paddingBottom: Layout.spacing.large, // Espace en bas de la liste
  },
  currentMonth: {
    fontSize: Fonts.sizes.xLarge,
    fontWeight: Fonts.weights.bold,
    color: Colors.textDark,
    marginBottom: Layout.spacing.medium,
  },
});

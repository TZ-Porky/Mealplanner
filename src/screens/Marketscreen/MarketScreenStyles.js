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
  // La liste des repas sera gérée par le ScrollView principal
  // Pas de style spécifique pour les cartes de repas ici, c'est géré dans MealCardStyles
});

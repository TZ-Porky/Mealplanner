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
  flatListContentContainer: {
    paddingBottom: Layout.spacing.medium, // Marge en bas pour le contenu total de la liste
                                        // Avant c'était 100 pour le bouton flottant,
                                        // maintenant c'est une marge générale
  },
  footerButtonContainer: {
    marginTop: Layout.spacing.large, // Espace au-dessus du bouton
    marginBottom: Layout.spacing.xSmall, // Espace en dessous du bouton
    alignItems: 'center', // Centre le bouton si votre AddMealButton est plus petit que la largeur
  },
  // La liste des repas sera gérée par le ScrollView principal
  // Pas de style spécifique pour les cartes de repas ici, c'est géré dans MealCardStyles
});

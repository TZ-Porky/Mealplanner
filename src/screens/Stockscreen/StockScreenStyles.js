import { StyleSheet } from 'react-native';
import { Colors, Fonts, Layout } from '../../styles/AppStyles'; // Adaptez le chemin

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
  browseIngredientsHighlight: { // Spécifique pour cette page
    color: Colors.primaryOrange,
  },
  browseSubtitle: {
    fontSize: Fonts.sizes.medium,
    color: Colors.textMedium,
    marginTop: Layout.spacing.xSmall,
  },
  flatListContentContainer: {
    paddingVertical: Layout.spacing.medium, // Espacement global du contenu de la liste
    paddingBottom: Layout.spacing.large * 2, // Pour laisser de la place au bouton du footer
  },
  footerButtonContainer: {
    marginTop: Layout.spacing.large,
    marginBottom: Layout.spacing.xSmall,
    alignItems: 'center', // Centrer le bouton
    paddingHorizontal: Layout.spacing.medium, // Assurer un padding horizontal
  },
});

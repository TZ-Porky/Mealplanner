import { StyleSheet } from 'react-native';
import { Colors, Fonts, Layout, GlobalStyles } from '../../styles/AppStyles';

export default StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.panelBackground,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.medium,
    marginHorizontal: Layout.spacing.medium, // Pour espacer les cartes
    flexDirection: 'row', // Pour l'image à gauche et le texte à droite
    overflow: 'hidden', // Pour s'assurer que le borderRadius fonctionne bien avec l'image
    ...GlobalStyles.shadow, // Ajout d'une ombre
  },
  image: {
    width: Layout.window.width * 0.35, // Environ 35% de la largeur de l'écran
    height: 'auto', // Ajuste automatiquement la hauteur
    aspectRatio: 1, // Pour que l'image soit carrée
    borderRadius: Layout.borderRadius.medium, // Les bords de l'image
  },
  infoContainer: {
    flex: 1,
    padding: Layout.spacing.small,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealName: {
    fontSize: Fonts.sizes.large,
    fontWeight: Fonts.weights.bold,
    color: Colors.textDark,
    flexShrink: 1, // Permet au texte de se réduire si trop long
  },
  tag: {
    backgroundColor: Colors.primaryOrange,
    borderRadius: Layout.borderRadius.small,
    paddingHorizontal: Layout.spacing.xSmall,
    paddingVertical: Layout.spacing.xSmall / 2,
    marginLeft: Layout.spacing.small,
  },
  tagText: {
    fontSize: Fonts.sizes.small,
    color: Colors.textLight,
  },
  description: {
    fontSize: Fonts.sizes.medium,
    color: Colors.textMedium,
    marginBottom: Layout.spacing.xSmall,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xSmall,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.medium,
  },
  detailIcon: {
    marginRight: Layout.spacing.xSmall,
    color: Colors.textMedium,
  },
  detailText: {
    fontSize: Fonts.sizes.small,
    color: Colors.textMedium,
  },
  priceRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: Fonts.sizes.large,
    fontWeight: Fonts.weights.bold,
    color: Colors.textDark,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: Fonts.sizes.medium,
    color: Colors.textMedium,
    marginRight: Layout.spacing.xSmall,
  },
  starIcon: {
    color: Colors.starYellow, // Couleur or pour l'étoile
  },
});

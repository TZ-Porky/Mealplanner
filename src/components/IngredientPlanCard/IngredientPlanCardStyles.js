// src/components/IngredientCard/IngredientCardStyles.js
import { StyleSheet } from 'react-native';
import { Colors, Layout, Fonts, GlobalStyles } from '../../styles/AppStyles';

export default StyleSheet.create({
  card: {
    width: (Layout.window.width / 2) - (Layout.spacing.medium * 1.5), // Pour deux cartes par ligne avec marges
    backgroundColor: Colors.cardBackground,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.small,
    alignItems: 'center',
    marginBottom: Layout.spacing.medium,
    ...GlobalStyles.shadow,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: Layout.borderRadius.circular, // Rend le fond circulaire
    backgroundColor: Colors.panelBackground, // Couleur de fond pour l'icône
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.small,
  },
  ingredientIcon: {
    // Si vous décidez de garder des images, ajustez ici
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  name: {
    fontSize: Fonts.sizes.large,
    fontWeight: Fonts.weights.semiBold,
    color: Colors.textDark,
    marginBottom: Layout.spacing.small,
    textAlign: 'center',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Prend toute la largeur de la carte
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: Fonts.sizes.small,
    color: Colors.textMedium,
    marginLeft: Layout.spacing.xSmall,
  },
});

// src/components/IngredientsSection/IngredientsSectionStyles.js
import { StyleSheet } from 'react-native';
import { Colors, Layout, Fonts } from '../../styles/AppStyles';

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: Colors.panelBackground,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  ingredientText: {
    flex: 1, // Pour que le nom de l'ingrédient prenne l'espace disponible
    fontSize: Fonts.sizes.large,
    color: Colors.textDark,
  },
  quantityText: {
    width: 50, // Largeur fixe pour la quantité (ex: "1/2")
    textAlign: 'right',
    fontSize: Fonts.sizes.large,
    color: Colors.textDark,
    marginRight: Layout.spacing.small,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: Layout.borderRadius.small,
    borderWidth: 2,
    borderColor: Colors.textMedium,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Layout.spacing.small,
  },
  checkedCheckbox: {
    backgroundColor: Colors.primaryOrange,
    borderColor: Colors.primaryOrange,
  },
  checkboxIcon: {
    color: Colors.textLight,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.spacing.medium,
    marginTop: Layout.spacing.medium,
    borderTopWidth: 1,
    borderTopColor: Colors.panelBackground,
  },
  totalText: {
    fontSize: Fonts.sizes.xLarge,
    fontWeight: Fonts.weights.bold,
    color: Colors.textDark,
  },
  totalPrice: {
    fontSize: Fonts.sizes.xLarge,
    fontWeight: Fonts.weights.bold,
    color: Colors.primaryOrange,
  },
});

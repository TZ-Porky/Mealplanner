// src/components/GenerateShoppingListButton/GenerateShoppingListButtonStyles.js
import { StyleSheet } from 'react-native';
import { Colors, Layout, Fonts } from '../../styles/AppStyles';

export default StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: Colors.buttonSecondary, // Une couleur différente pour le distinguer
    paddingVertical: Layout.spacing.medium,
    paddingHorizontal: Layout.spacing.xLarge,
    borderRadius: Layout.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '80%',
  },
  buttonText: {
    color: Colors.textLight,
    fontSize: Fonts.sizes.xLarge,
    fontWeight: Fonts.weights.bold,
    marginRight: Layout.spacing.small,
  },
  buttonIcon: {
    color: Colors.textLight,
  },
});

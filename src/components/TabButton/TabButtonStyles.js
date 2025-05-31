// src/components/TabButton/TabButtonStyles.js
import { StyleSheet } from 'react-native';
import { Colors, Layout, Fonts } from '../../styles/AppStyles';

export default StyleSheet.create({
  button: {
    flex: 1, // Chaque bouton prend une part égale de l'espace
    paddingVertical: Layout.spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Layout.borderRadius.medium, // Pour les bords arrondis des onglets
    marginHorizontal: Layout.spacing.xSmall / 2, // Petit espace entre les boutons
  },
  activeButton: {
    backgroundColor: Colors.primaryOrange,
  },
  inactiveButton: {
    backgroundColor: Colors.panelBackground, // Couleur du fond des onglets inactifs
  },
  buttonText: {
    fontSize: Fonts.sizes.large,
    fontWeight: Fonts.weights.semiBold,
  },
  activeText: {
    color: Colors.textLight,
  },
  inactiveText: {
    color: Colors.textDark,
  },
});

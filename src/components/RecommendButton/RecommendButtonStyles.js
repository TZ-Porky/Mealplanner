// src/components/RecommendButton/RecommendButtonStyles.js
import { StyleSheet } from 'react-native';
import { Colors, Layout, Fonts } from '../../styles/AppStyles';

export default StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: Colors.buttonPrimary,
    paddingVertical: Layout.spacing.medium,
    paddingHorizontal: Layout.spacing.xLarge,
    borderRadius: Layout.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '80%', // Pour donner une largeur suffisante au bouton
  },
  buttonText: {
    color: Colors.textLight,
    fontSize: Fonts.sizes.xLarge,
    fontWeight: Fonts.weights.bold,
    marginRight: Layout.spacing.small,
  },
  buttonIcon: {
    // La couleur est définie dans le composant lui-même car elle dépend des props
  },
});

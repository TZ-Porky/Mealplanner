// src/components/CookwareSection/CookwareSectionStyles.js
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
    borderBottomWidth: 0, // Pas de bordure pour la dernière ligne
  },
  text: {
    fontSize: Fonts.sizes.large,
    color: Colors.textDark,
  },
  totalText: {
    fontSize: Fonts.sizes.xLarge,
    fontWeight: Fonts.weights.bold,
    color: Colors.textDark,
  },
});

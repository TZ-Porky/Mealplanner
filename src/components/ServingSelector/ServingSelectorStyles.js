// src/components/ServingsSelector/ServingsSelectorStyles.js
import { StyleSheet } from 'react-native';
import { Colors, Layout, Fonts } from '../../styles/AppStyles';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.panelBackground, // Fond gris clair
    borderRadius: Layout.borderRadius.small,
    paddingHorizontal: Layout.spacing.small,
    paddingVertical: Layout.spacing.xSmall,
  },
  text: {
    fontSize: Fonts.sizes.large,
    color: Colors.textDark,
    marginRight: Layout.spacing.xSmall,
  },
  button: {
    padding: Layout.spacing.xSmall / 2,
  },
  buttonIcon: {
    color: Colors.textDark,
  },
  servingsCount: {
    fontSize: Fonts.sizes.large,
    fontWeight: Fonts.weights.bold,
    color: Colors.primaryOrange,
    marginHorizontal: Layout.spacing.xSmall,
  },
});

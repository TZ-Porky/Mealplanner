// src/components/InstructionsSection/InstructionsSectionStyles.js
import { StyleSheet } from 'react-native';
import { Colors, Layout, Fonts } from '../../styles/AppStyles';

export default StyleSheet.create({
  stepContainer: {
    marginBottom: Layout.spacing.medium,
    paddingBottom: Layout.spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: Colors.panelBackground,
  },
  lastStep: {
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.xSmall,
  },
  stepNumber: {
    fontSize: Fonts.sizes.large,
    fontWeight: Fonts.weights.bold,
    color: Colors.textDark,
  },
  stepTime: {
    fontSize: Fonts.sizes.medium,
    color: Colors.textMedium,
  },
  stepDescription: {
    fontSize: Fonts.sizes.large,
    color: Colors.textDark,
    lineHeight: Fonts.sizes.large * 1.4, // Pour une meilleure lisibilité
  },
});

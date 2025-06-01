import { StyleSheet } from 'react-native';
import { Colors, Fonts, Layout, GlobalStyles } from '../../styles/AppStyles';

export default StyleSheet.create({
  buttonContainer: {
    width: '90%',
    bottom: Layout.spacing.large,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryOrange,
    borderRadius: Layout.borderRadius.large,
    paddingVertical: Layout.spacing.medium,
    paddingHorizontal: Layout.spacing.xLarge,
    flexDirection: 'row',
    alignItems: 'center',
    ...GlobalStyles.shadow, // Ombre pour l'effet flottant
  },
  buttonIcon: {
    color: Colors.textLight,
    marginRight: Layout.spacing.small,
  },
  buttonText: {
    color: Colors.textLight,
    fontSize: Fonts.sizes.xLarge,
    fontWeight: Fonts.weights.bold,
  },
});

import { StyleSheet } from 'react-native';
import { Colors, Fonts, Layout } from '../../styles/AppStyles';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Layout.spacing.medium,
    marginBottom: Layout.spacing.medium,
  },
  button: {
    paddingVertical: Layout.spacing.small,
    paddingHorizontal: Layout.spacing.medium,
    borderRadius: Layout.borderRadius.medium,
    backgroundColor: Colors.inputBackground, // Couleur par défaut
  },
  activeButton: {
    backgroundColor: Colors.primaryOrange, // Couleur active
  },
  buttonText: {
    fontSize: Fonts.sizes.medium,
    color: Colors.textDark,
    fontWeight: Fonts.weights.regular,
  },
  activeButtonText: {
    color: Colors.textLight,
    fontWeight: Fonts.weights.bold,
  },
});

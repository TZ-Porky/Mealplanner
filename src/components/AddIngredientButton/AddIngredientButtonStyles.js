import { StyleSheet } from 'react-native';
import { Colors, Fonts, Layout, GlobalStyles } from '../../styles/AppStyles'; // Adaptez le chemin

export default StyleSheet.create({
  buttonContainer: {
    width: '100%',
    backgroundColor: Colors.primaryOrange,
    borderRadius: Layout.borderRadius.large,
    paddingVertical: Layout.spacing.medium,
    paddingHorizontal: Layout.spacing.xLarge,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centre le texte et l'icône horizontalement
    ...GlobalStyles.shadow,
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

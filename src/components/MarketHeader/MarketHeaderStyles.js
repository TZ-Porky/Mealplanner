import { StyleSheet } from 'react-native';
import { Colors, Fonts, Layout } from '../../styles/AppStyles';

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.medium,
    paddingVertical: Layout.spacing.small,
    backgroundColor: Colors.blankBackground, // Ou une autre couleur si votre en-tête est différent
    paddingTop: Layout.spacing.large, // Espace pour la barre de statut
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: Layout.spacing.small,
    color: Colors.textDark,
  },
  headerTitle: {
    fontSize: Fonts.sizes.xxLarge,
    fontWeight: Fonts.weights.bold,
    color: Colors.textDark,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: Layout.spacing.xSmall,
  },
  headerIcon: {
    color: Colors.textDark,
  },
});

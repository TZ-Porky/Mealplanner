// src/screens/RecipeDetailScreen/RecipeDetailScreenStyles.js
import { StyleSheet } from 'react-native';
import { Colors, Layout } from '../../styles/AppStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blankBackground,
  },
  // Les styles du RecipeDetailHeader sont dans son propre fichier
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Layout.spacing.medium + 12,
    marginBottom: Layout.spacing.medium,
  },
  tabContentArea:{
    paddingHorizontal: Layout.spacing.medium,
  },
  contentSection: {
    flex: 1, // Pour que le contenu prenne l'espace restant et soit défilable
    paddingHorizontal: Layout.spacing.medium + 32,
    paddingBottom: Layout.spacing.large, // Marge en bas du contenu
  },
  generateListButtonContainer: {
    padding: Layout.spacing.medium,
    alignItems: 'center',
    backgroundColor: Colors.blankBackground, // Correspond au fond de l'écran
  },
});

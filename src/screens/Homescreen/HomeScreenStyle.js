import { StyleSheet } from 'react-native';
import { Colors, Layout, Fonts, GlobalStyles } from '../../styles/AppStyles'; // Assurez-vous que le chemin est correct

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blankBackground, // C'est le style du View parent, pas du ScrollView
  },
  // Ancien styles.scrollViewContent qui générait l'avertissement
  // Déplacez les propriétés de flex et de padding du ScrollView ici
  scrollViewContent: { // Ceci est maintenant contentContainerStyle
    paddingHorizontal: Layout.spacing.medium,
    paddingTop: Layout.spacing.medium, // Ajouter un peu de padding en haut pour le contenu
    paddingBottom: Layout.spacing.large, // Ajouter un padding en bas pour le dernier élément
    // Si vous aviez des styles de flex ou de justifyContent/alignItems ici, ils seraient maintenant corrects
    // Par exemple, si vous vouliez que le contenu se centre verticalement si court:
    // flexGrow: 1,
    // justifyContent: 'center',
  },
  section: {
    marginBottom: Layout.spacing.large,
  },
  greetingText: {
    fontSize: Fonts.sizes.heading,
    fontWeight: Fonts.weights.bold,
    color: Colors.textDark,
    marginBottom: Layout.spacing.xSmall / 2,
  },
  questionText: {
    fontSize: Fonts.sizes.large,
    color: Colors.textMedium,
  },
  searchBarContainer: { // Si vous continuez à l'utiliser directement ici
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: Layout.borderRadius.medium,
    paddingHorizontal: Layout.spacing.small,
    height: 50,
    ...GlobalStyles.shadow,
  },
  searchInput: {
    flex: 1,
    fontSize: Fonts.sizes.large,
    color: Colors.textDark,
    paddingVertical: 0,
  },
  searchIconContainer: {
    padding: Layout.spacing.small / 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.medium,
  },
  // Les styles pour RecipeCard et IngredientCard sont dans leurs propres fichiers
  // recipesScroll: {
  //   // Aucun style flex ou justifyContent ici car c'est un ScrollView horizontal
  //   // Si vous avez un ScrollView horizontal, ce style s'applique au ScrollView lui-même
  //   // et les propriétés de mise en page des éléments à l'intérieur iraient sur contentContainerStyle
  // },
  ingredientsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Ceci est correct ici car c'est un View
  },
  currentMonth: {
    fontSize: Fonts.sizes.xLarge,
    fontWeight: Fonts.weights.bold,
    color: Colors.textDark,
    marginBottom: Layout.spacing.medium,
  },
  mealPlanDetails: {
    // Styles spécifiques si nécessaire
  },
  recommendButtonSection: {
    paddingVertical: Layout.spacing.large,
    alignItems: 'center',
  },
  // N'oubliez pas les styles définis dans GlobalStyles pour sectionTitle et seeAllLink
});

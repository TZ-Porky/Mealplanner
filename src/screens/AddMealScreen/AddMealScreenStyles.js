import { StyleSheet, Platform } from 'react-native';
import { Colors, Fonts, Layout, GlobalStyles } from '../../styles/AppStyles'; // Assurez-vous que le chemin vers vos constantes est correct. Ici, j'utilise 'constants' comme chemin standard.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blankBackground,
  },
  flatListContentContainer: { // Renommé pour correspondre à l'utilisation dans le ScrollView
    flexGrow: 1,
    paddingBottom: Layout.spacing.large, // Espace en bas pour les boutons
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? Layout.spacing.xLarge : Layout.spacing.medium,
    paddingBottom: Layout.spacing.medium,
    backgroundColor: Colors.primaryOrange, // Correspond à l'image
    borderBottomLeftRadius: Layout.borderRadius.large,
    borderBottomRightRadius: Layout.borderRadius.large,
    marginBottom: Layout.spacing.medium,
    alignItems: 'flex-start', // Aligner le titre "Add Meal" à gauche
    justifyContent: 'center',
    paddingHorizontal: Layout.spacing.medium, // Pour que le texte ne touche pas les bords
  },
  headerTopRow: { // Pour les boutons retour et ajouter image
    flexDirection: 'row',
    justifyContent: 'flex-end', // Aligner le bouton d'image à droite
    alignItems: 'center',
    width: '100%',
    // paddingHorizontal: Layout.spacing.medium, // Déjà dans le header
    marginBottom: Layout.spacing.medium, // Espace sous la ligne des boutons
  },
  headerButton: {
    padding: Layout.spacing.small,
    // Note: Le bouton retour n'est pas visible dans AddMeal.png, mais nous le gardons pour la cohérence.
    // L'image montre un bouton d'image à droite.
  },
  mealImagePreview: { // Style pour l'image de prévisualisation (si ajoutée)
    width: '90%', // ou 'auto' si vous voulez qu'elle remplisse plus.
    height: 150,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.medium,
    resizeMode: 'cover',
    alignSelf: 'center', // Centrer l'image si elle est affichée
  },
  title: {
    textAlign: 'left', // Aligné à gauche comme sur l'image
    fontWeight: Fonts.weights.bold,
    fontSize: Fonts.sizes.xxLarge,
    color: Colors.textLight, // Texte clair sur fond orange
    marginBottom: Layout.spacing.xSmall,
  },
  subtitle: { // Ce sous-titre n'est pas visible dans l'image, donc nous le stylisons de manière générique ou le retirons.
    fontSize: Fonts.sizes.medium,
    textAlign: 'left',
    fontWeight: Fonts.weights.medium,
    color: Colors.textLight,
    // marginBottom: Layout.spacing.medium, // Déjà géré par paddingBottom du header
  },
  body: {
    flex: 1,
    paddingVertical: Layout.spacing.medium,
    paddingHorizontal: Layout.spacing.medium,
    // Pas de justifyContent ou alignItems pour laisser les champs s'aligner naturellement
  },
  field: {
    marginBottom: Layout.spacing.medium, // Espace entre les champs
  },
  label: {
    fontSize: Fonts.sizes.medium,
    fontWeight: Fonts.weights.bold,
    color: Colors.textDark, // Couleur foncée pour le label
    marginBottom: Layout.spacing.xSmall,
    marginLeft: Layout.spacing.xSmall, // Aligner avec le padding de l'input
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground, // Couleur de fond de l'input
    borderRadius: Layout.borderRadius.small, // Rayon de bordure
    paddingHorizontal: Layout.spacing.small,
    height: 50, // Hauteur fixe pour l'input
    borderColor: Colors.borderColor, // Couleur de la bordure
    borderWidth: 1, // Bordure visible
  },
  icon: {
    marginRight: Layout.spacing.small,
    color: Colors.iconColor, // Couleur des icônes
  },
  input: {
    flex: 1,
    fontSize: Fonts.sizes.medium,
    color: Colors.textDark,
    paddingVertical: 0,
  },
  // Style spécifique pour les champs "Add Ingredients", "Add Cookware", "Add Instructions"
  actionFieldInputContainer: {
    backgroundColor: Colors.panelBackground, // Fond légèrement différent ou blanc
    borderRadius: Layout.borderRadius.small,
    borderWidth: 0, // Pas de bordure pour ces champs spécifiques
    height: 50,
    justifyContent: 'space-between', // Espacer le texte et le bouton +
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.medium,
  },
  actionFieldInput: {
    flex: 1, // Le texte prend de l'espace
    color: Colors.textMedium, // Texte en gris pour les placeholders
  },
  actionButton: {
    padding: Layout.spacing.xSmall,
  },
  actionButtonIcon: {
    color: Colors.primaryOrange, // Icône orange
  },

  // buttonContainer pour les boutons du bas
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Espacer les deux boutons du bas
    paddingHorizontal: Layout.spacing.medium,
    paddingVertical: Layout.spacing.medium,
    borderTopWidth: 0, // Pas de ligne de séparation visible dans l'image
    backgroundColor: Colors.blankBackground,
  },
  // Styles spécifiques pour les boutons Cancel et Finish
  cancelButton: {
    flex: 1,
    marginRight: Layout.spacing.small,
    backgroundColor: Colors.buttonGray, // Couleur grise pour Cancel
    borderRadius: Layout.borderRadius.large, // Rayon plus grand pour les boutons du bas
    paddingVertical: Layout.spacing.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: Colors.textDark, // Texte sombre pour Cancel
    fontSize: Fonts.sizes.large,
    fontWeight: Fonts.weights.bold,
  },
  finishButton: {
    flex: 1,
    backgroundColor: Colors.primaryOrange, // Couleur orange pour Finish
    borderRadius: Layout.borderRadius.large, // Rayon plus grand pour les boutons du bas
    paddingVertical: Layout.spacing.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finishButtonText: {
    color: Colors.textLight, // Texte clair pour Finish
    fontSize: Fonts.sizes.large,
    fontWeight: Fonts.weights.bold,
  },
});

export default styles;

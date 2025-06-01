import { StyleSheet } from 'react-native';
import { Colors, Fonts, Layout, GlobalStyles } from '../../styles/AppStyles'; // Adaptez le chemin si vos constants sont ailleurs

export default StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.blankBackground, // Couleur de fond pour la carte
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.small,
    marginHorizontal: Layout.spacing.medium, // Pour espacer les cartes des bords
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.small,
    ...GlobalStyles.shadow, // Ajout d'une ombre pour un effet de carte
  },
  image: {
    width: 60, // Taille fixe pour l'image de l'ingrédient
    height: 60,
    borderRadius: Layout.borderRadius.small,
    marginRight: Layout.spacing.small,
    //backgroundColor: Colors.blankBackground, // Couleur de fond si l'image ne remplit pas
    justifyContent: 'center',
    alignItems: 'center',
  },
  ingredientImage: {
    width: '80%', // L'image de l'ingrédient remplit 80% du conteneur d'image
    height: '80%',
    resizeMode: 'contain', // Assurez-vous que l'image tient dans le cadre
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  ingredientName: {
    fontSize: Fonts.sizes.large,
    fontWeight: Fonts.weights.bold,
    color: Colors.textDark,
  },
  ingredientPrice: {
    fontSize: Fonts.sizes.medium,
    color: Colors.textMedium,
    marginTop: Layout.spacing.xSmall / 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground, // Fond pour les contrôles de quantité
    borderRadius: Layout.borderRadius.small,
    paddingHorizontal: Layout.spacing.xSmall,
    marginRight: Layout.spacing.small,
  },
  quantityButton: {
    padding: Layout.spacing.xSmall,
  },
  quantityButtonText: {
    fontSize: Fonts.sizes.large,
    fontWeight: Fonts.weights.bold,
    color: Colors.textDark,
  },
  quantityText: {
    fontSize: Fonts.sizes.medium,
    color: Colors.textDark,
    marginHorizontal: Layout.spacing.xSmall,
  },
  deleteButton: {
    padding: Layout.spacing.xSmall,
  },
  deleteIcon: {
    color: Colors.textMedium, // Couleur pour l'icône de suppression
  },
});

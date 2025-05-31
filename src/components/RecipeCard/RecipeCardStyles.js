// src/components/RecipeCard/RecipeCardStyles.js
import { StyleSheet } from 'react-native';
import { Colors, Layout } from '../../styles/AppStyles';

export default StyleSheet.create({
  card: {
    width: (Layout.window.width / 2) - (Layout.spacing.medium - 35),
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius + 32,
    overflow: 'hidden', // Pour que l'image respecte le borderRadius
    marginRight: Layout.spacing.medium,
    marginBottom: Layout.spacing.medium,
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: Layout.cardElevation,
  },
  image: {
    width: '99%',
    height: 120, // Hauteur fixe pour les images de recette
    resizeMode: 'cover',
  },
  tagsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: Layout.spacing.small,
    left: Layout.spacing.small,
  },
  tag: {
    backgroundColor: 'rgba(250, 245, 245, 0.82)', // Fond semi-transparent
    color: Colors.white,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    fontSize: 10,
    marginRight: Layout.spacing.small / 2,
  },
  content: {
    padding: Layout.spacing.small,
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: Layout.spacing.small / 2,
    color: Colors.text,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: Colors.darkGray,
    marginLeft: 4,
  },
  icon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 12,
    height: 12,
    tintColor: '#FFD700', // Couleur étoile or
  },
});

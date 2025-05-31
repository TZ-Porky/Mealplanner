import {StyleSheet} from 'react-native';
import {Colors, Layout, Fonts} from '../../styles/AppStyles';

export default StyleSheet.create({
  headerImageContainer: {
    width: Layout.window.width,
    height: Layout.window.width * 0.7, // Ratio d'image, ajustez au besoin
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayButtons: {
    position: 'absolute',
    top: Layout.spacing.large - 10, // Ajustez pour la barre de statut
    left: Layout.spacing.medium,
    right: Layout.spacing.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1, // Pour s'assurer qu'ils sont au-dessus de l'image
  },
  iconButton: {
    backgroundColor: 'rgba(0,0,0,0.4)', // Fond semi-transparent
    borderRadius: Layout.borderRadius.circular,
    padding: Layout.spacing.small,
  },
  headerContent: {
    backgroundColor: Colors.blankBackground, // Couleur de fond du panneau
    borderTopLeftRadius: Layout.borderRadius.xLarge,
    borderTopRightRadius: Layout.borderRadius.xLarge,
    marginTop: -Layout.spacing.xLarge * 2, // Pour chevaucher l'image
    padding: Layout.spacing.medium,
    paddingTop: Layout.spacing.xLarge - 20, // Espace pour le chevauchement
    ...Layout.cardElevation, // Simuler une ombre
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.medium - 10,
  },
  recipeTitle: {
    fontSize: Fonts.sizes.heading,
    fontWeight: Fonts.weights.bold,
    color: Colors.textDark,
    flexShrink: 1, // Permet au titre de se réduire si la note est longue
    marginRight: Layout.spacing.small,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: Fonts.sizes.xLarge,
    fontWeight: Fonts.weights.bold,
    color: Colors.primaryOrange,
    marginRight: Layout.spacing.xSmall,
  },
  starIcon: {
    color: Colors.primaryYellow,
  },
  infoRow: {
    width: '110%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.medium,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.large,
  },
  infoIcon: {
    marginRight: Layout.spacing.xSmall,
    color: Colors.textMedium,
  },
  infoText: {
    fontSize: Fonts.sizes.large,
    color: Colors.textMedium,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.panelBackground, // Fond gris clair pour le prix
    borderRadius: Layout.borderRadius.medium,
    paddingHorizontal: Layout.spacing.medium,
    paddingVertical: Layout.spacing.small,
    alignSelf: 'flex-start', // Pour que le conteneur ne prenne pas toute la largeur
  },
  priceIcon: {
    marginRight: Layout.spacing.xSmall,
    color: Colors.textDark,
  },
  priceText: {
    fontSize: Fonts.sizes.large,
    fontWeight: Fonts.weights.semiBold,
    color: Colors.textDark,
  },
});

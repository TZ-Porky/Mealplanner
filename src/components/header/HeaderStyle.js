// src/components/Header/HeaderStyles.js
import { StyleSheet } from 'react-native';
import { Colors, Layout, Fonts, GlobalStyles } from '../../styles/AppStyles';

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.medium,
    paddingTop: Layout.spacing.large, // Adapter pour la barre de statut si nécessaire
    paddingBottom: Layout.spacing.small,
    backgroundColor: Colors.white,
    // Ajoutez une ombre si désiré
    shadowColor: Colors.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: Layout.cardElevation,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: Layout.spacing.small,
  },
  menuIcon: {
    width: 24, // Assurez-vous d'avoir une icône ou un SVG
    height: 24,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: Layout.spacing.medium,
    color: Colors.text,
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: Layout.spacing.small,
    marginLeft: Layout.spacing.small,
  },
  icon: {
    width: 24, // Taille des icônes
    height: 24,
  },
});

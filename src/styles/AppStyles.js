import { StyleSheet, Dimensions } from 'react-native';

// --- COULEURS ---
export const Colors = {
  primaryOrange: '#EB7A34',
  primaryYellow: '#FFD700', // Jaune pour les étoiles ou accents

  textDark: '#333333',     // Texte principal sombre
  textMedium: '#666666',   // Texte secondaire/gris
  textLight: '#FFFFFF',    // Texte blanc sur fond sombre ou bouton

  cardBackground: '#FFFFFF',    // Fond des cartes et éléments principaux
  blankBackground: '#F5F5F5',  // Fond général de l'écran (celui de votre image est plus clair)
  panelBackground: '#e0dfdf',   // Pour les sections spécifiques ou fonds de barres (gris clair)

  shadowColor: '#000',      // Couleur de base pour les ombres

  buttonPrimary: '#EB7A34',     // Couleur principale des boutons
  buttonPressed: '#c05513',     // Couleur du bouton au toucher
  buttonDisabled: '#D3D3D3',    // Couleur du bouton désactivé
  buttonBorder: '#000',         // Couleur de la bordure des boutons (si applicable)

  tagEasy: '#4CAF50',           // Vert pour le tag "Easy"
  tagParts: '#3F51B5',          // Bleu pour le tag "Parts" (exemple)
};

// --- LAYOUT (Dimensions, Espacements, Rayons de bordure) ---
const { width, height } = Dimensions.get('window');

export const Layout = {
  window: {
    width,
    height,
  },
  spacing: {
    xSmall: 4,
    small: 8,
    medium: 16,
    large: 24,
    xLarge: 32,
    xxLarge: 48,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    circular: 999, // Pour les éléments ronds
  },
  cardElevation: 3, // Pour les ombres sur Android (valeur typique)
  headerHeight: 60, // Hauteur typique d'un header
  iconSize: {
    small: 16,
    medium: 24,
    large: 32,
  },
};

// --- POLICES ---
export const Fonts = {
  sizes: {
    xSmall: 10,
    small: 12,
    medium: 14,
    large: 16,
    xLarge: 18,
    xxLarge: 20,
    heading: 24,
  },
  weights: {
    light: '300',
    normal: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
  },
  // Vous pouvez ajouter des noms de police si vous utilisez des polices personnalisées
  // family: {
  //   regular: 'Montserrat-Regular',
  //   bold: 'Montserrat-Bold',
  // },
};


// --- STYLES GLOBAUX ---
// Ces styles sont ceux qui pourraient s'appliquer à l'ensemble de l'application,
// par exemple pour réinitialiser certains éléments ou pour des conteneurs de base.
export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blankBackground,
  },
  sectionPadding: {
    paddingHorizontal: Layout.spacing.medium,
    paddingVertical: Layout.spacing.large,
  },
  shadow: {
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: Layout.cardElevation,
  },
  // Exemple de style pour un titre de section réutilisable
  sectionTitle: {
    fontSize: Fonts.sizes.xLarge,
    fontWeight: Fonts.weights.bold,
    color: Colors.textDark,
  },
  // Style pour le lien "See All"
  seeAllLink: {
    fontSize: Fonts.sizes.medium,
    color: Colors.primaryOrange,
    fontWeight: Fonts.weights.semiBold,
  },
});

import { StyleSheet } from 'react-native';
import { Colors, Fonts, Layout } from '../../styles/AppStyles'; // Ajustez le chemin si nécessaire

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.blankBackground,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.medium,
    width: '90%',
    maxHeight: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.medium,
  },
  modalTitle: {
    fontSize: Fonts.sizes.xLarge,
    fontWeight: Fonts.weights.bold,
    color: Colors.textDark,
  },
  closeButton: {
    padding: Layout.spacing.xSmall,
  },
  closeIcon: {
    color: Colors.iconColor,
  },
  textInput: {
    backgroundColor: Colors.inputBackground,
    borderRadius: Layout.borderRadius.small,
    padding: Layout.spacing.small,
    fontSize: Fonts.sizes.medium,
    color: Colors.textDark,
    minHeight: 150, // Hauteur minimale pour la zone de texte
    textAlignVertical: 'top', // Alignement du texte en haut
    marginBottom: Layout.spacing.medium,
  },
  saveButton: {
    backgroundColor: Colors.primaryOrange,
    borderRadius: Layout.borderRadius.medium,
    paddingVertical: Layout.spacing.medium,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.textLight,
    fontSize: Fonts.sizes.large,
    fontWeight: Fonts.weights.bold,
  },
});

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
    backgroundColor: Colors.blankBackground, // Fond de la modale
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.medium,
    width: '90%',
    maxHeight: '80%',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderRadius: Layout.borderRadius.small,
    paddingHorizontal: Layout.spacing.small,
    marginBottom: Layout.spacing.medium,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: Fonts.sizes.medium,
    color: Colors.textDark,
    paddingVertical: 0,
  },
  addButton: {
    marginLeft: Layout.spacing.small,
    paddingVertical: Layout.spacing.small,
    paddingHorizontal: Layout.spacing.medium,
    backgroundColor: Colors.primaryOrange,
    borderRadius: Layout.borderRadius.small,
  },
  addButtonText: {
    color: Colors.textLight,
    fontWeight: Fonts.weights.bold,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.panelBackground, // Fond pour chaque élément de liste
    borderRadius: Layout.borderRadius.small,
    padding: Layout.spacing.small,
    marginBottom: Layout.spacing.xSmall,
  },
  listItemText: {
    fontSize: Fonts.sizes.medium,
    color: Colors.textDark,
    flex: 1, // Pour que le texte prenne de la place
  },
  removeButton: {
    padding: Layout.spacing.xSmall,
    marginLeft: Layout.spacing.small,
  },
  removeIcon: {
    color: Colors.errorRed,
  },
  emptyListText: {
    textAlign: 'center',
    color: Colors.textMedium,
    fontSize: Fonts.sizes.medium,
    marginTop: Layout.spacing.small,
  },
  saveButton: {
    backgroundColor: Colors.primaryOrange,
    borderRadius: Layout.borderRadius.medium,
    paddingVertical: Layout.spacing.medium,
    alignItems: 'center',
    marginTop: Layout.spacing.medium,
  },
  saveButtonText: {
    color: Colors.textLight,
    fontSize: Fonts.sizes.large,
    fontWeight: Fonts.weights.bold,
  },
});

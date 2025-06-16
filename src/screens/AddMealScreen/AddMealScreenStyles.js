// src/screens/AddMealScreenStyle.js
import { StyleSheet } from 'react-native';
import { Colors, Fonts, Layout } from '../../styles/AppStyles'; // Assurez-vous que ces constantes sont définies dans votre projet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.spacing.medium,
  },
  header: {
    backgroundColor: Colors.primaryOrange,
    padding: Layout.spacing.medium,
    paddingTop: Layout.spacing.large * 1.5, // Pour laisser de la place à la barre de statut
    borderBottomLeftRadius: Layout.borderRadius.large,
    borderBottomRightRadius: Layout.borderRadius.large,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.medium,
  },
  headerTitle: {
    fontFamily: Fonts.primary,
    fontSize: Fonts.sizes.h3,
    color: Colors.textLight,
    fontWeight: 'bold',
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: Layout.borderRadius.small,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  section: {
    backgroundColor: Colors.background,
    borderRadius: Layout.borderRadius.small,
    padding: Layout.spacing.medium,
    marginBottom: Layout.spacing.medium,
    elevation: 2, // Ombre pour Android
    shadowColor: Colors.shadow, // Ombre pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontFamily: Fonts.primary,
    fontSize: Fonts.sizes.medium,
    color: Colors.textDark,
    marginBottom: Layout.spacing.small,
    fontWeight: 'bold',
  },
  input: {
    fontFamily: Fonts.primary,
    fontSize: Fonts.sizes.medium,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Layout.borderRadius.small,
    padding: Layout.spacing.small,
    color: Colors.textDark,
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Layout.borderRadius.small,
    padding: Layout.spacing.small,
    textAlign: 'center',
    marginHorizontal: Layout.spacing.tiny,
    color: Colors.textDark,
    fontSize: Fonts.sizes.medium,
  },
  timeSeparator: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  rowInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unitText: {
    fontFamily: Fonts.primary,
    fontSize: Fonts.sizes.medium,
    color: Colors.textGray,
    marginLeft: Layout.spacing.small,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Layout.borderRadius.small,
    overflow: 'hidden',
    justifyContent: 'center',
    position: 'relative', // Pour positionner l'icône
  },
  picker: {
    width: '100%',
    color: Colors.textDark, // Couleur du texte par défaut
  },
  pickerItem: {
    fontSize: Fonts.sizes.medium,
    fontFamily: Fonts.primary,
    color: Colors.textDark,
  },
  pickerIcon: {
    position: 'absolute',
    right: Layout.spacing.small,
    top: '50%',
    transform: [{ translateY: -10 }], // Centre verticalement
    pointerEvents: 'none', // Pour que le Picker soit toujours cliquable
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Layout.spacing.small,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: Layout.borderRadius.small,
    paddingVertical: Layout.spacing.tiny,
    paddingHorizontal: Layout.spacing.small,
    marginRight: Layout.spacing.small,
    marginBottom: Layout.spacing.small,
  },
  tagText: {
    color: Colors.textLight,
    fontFamily: Fonts.primary,
    fontSize: Fonts.sizes.small,
    marginRight: Layout.spacing.tiny,
  },
  removeTagButton: {
    padding: 2,
  },
  addTagInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addTagButton: {
    marginLeft: Layout.spacing.small,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.small,
    paddingRight: Layout.spacing.tiny,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Layout.borderRadius.small,
    justifyContent: 'center',
    position: 'relative',
    height: 48, // Hauteur fixe pour aligner avec les TextInput
  },
  addButton: {
    marginLeft: Layout.spacing.small,
  },
  removeButton: {
    marginRight: Layout.spacing.tiny,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Layout.spacing.medium,
    marginBottom: Layout.spacing.large,
  },
});

export default styles;

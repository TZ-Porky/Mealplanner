import { StyleSheet } from 'react-native';
import { Colors, Fonts, Layout } from '../../styles/AppStyles'; // Adaptez le chemin

export default StyleSheet.create({
  container: {
    width: '100%',
  },
  tagsDisplayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Layout.spacing.small,
  },
  tag: {
    backgroundColor: Colors.tagBackground,
    borderRadius: Layout.borderRadius.small,
    paddingVertical: Layout.spacing.xSmall,
    paddingHorizontal: Layout.spacing.small,
    marginRight: Layout.spacing.small,
    marginBottom: Layout.spacing.small,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    color: Colors.tagText,
    fontSize: Fonts.sizes.small,
  },
  removeTagButton: {
    marginLeft: Layout.spacing.xSmall,
  },
  removeTagIcon: {
    color: Colors.tagText,
    fontSize: Fonts.sizes.medium, // Ajustez la taille de l'icône
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderRadius: Layout.borderRadius.small,
    paddingHorizontal: Layout.spacing.small,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: Fonts.sizes.medium,
    color: Colors.textDark,
    paddingVertical: 0,
  },
  addTagButton: {
    marginLeft: Layout.spacing.small,
    padding: Layout.spacing.small,
    borderRadius: Layout.borderRadius.small,
    backgroundColor: Colors.secondaryBackground, // Ou une autre couleur distinctive
  },
  addTagText: {
    color: Colors.primaryOrange,
    fontWeight: Fonts.weights.bold,
  },
  // Pour les tags suggérés
  suggestedTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Layout.spacing.xSmall,
  },
  suggestedTagButton: {
    backgroundColor: Colors.inputBackground,
    borderRadius: Layout.borderRadius.small,
    paddingVertical: Layout.spacing.xSmall,
    paddingHorizontal: Layout.spacing.small,
    marginRight: Layout.spacing.small,
    marginBottom: Layout.spacing.small,
  },
  suggestedTagText: {
    color: Colors.textMedium,
    fontSize: Fonts.sizes.small,
  },
});

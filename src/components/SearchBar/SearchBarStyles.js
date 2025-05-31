// src/components/SearchBar/SearchBarStyles.js
import { StyleSheet } from 'react-native';
import { Colors, Layout, Fonts, GlobalStyles } from '../../styles/AppStyles';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: Layout.borderRadius.medium,
    paddingHorizontal: Layout.spacing.medium,
    height: 50,
    ...GlobalStyles.shadow,
  },
  input: {
    flex: 1,
    fontSize: Fonts.sizes.large,
    color: Colors.textDark,
    paddingVertical: 0, // Important pour la hauteur sur iOS
  },
  searchIcon: {
    marginLeft: Layout.spacing.small,
    padding: Layout.spacing.xSmall,
  },
});

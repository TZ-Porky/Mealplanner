import { StyleSheet } from 'react-native';
import { Colors, Fonts, Layout } from '../../styles/AppStyles';

export default StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.medium,
    marginBottom: Layout.spacing.medium,
  },
  filterButton: {
    paddingVertical: Layout.spacing.xSmall,
    paddingHorizontal: Layout.spacing.medium,
    borderRadius: Layout.borderRadius.large,
    marginRight: Layout.spacing.small,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: Colors.primaryOrange,
    borderColor: Colors.primaryOrange,
  },
  buttonText: {
    fontSize: Fonts.sizes.medium,
    color: Colors.textDark,
  },
  activeText: {
    color: Colors.textLight,
  },
});

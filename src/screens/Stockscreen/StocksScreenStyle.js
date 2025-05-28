import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../styles/AppStyles';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
  },
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.cardBackground,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
    elevation: 2,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  addButtonHeader: { // Style pour le bouton d'ajout dans le header
    padding: 5,
  },

  // Item List Styles
  listContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  itemExpiringSoon: {
    borderLeftWidth: 5,
    borderColor: '#FFD700', // Jaune/Orange pour bientôt périmé
  },
  itemExpired: {
      borderLeftWidth: 5,
      borderColor: '#FF4500', // Rouge pour périmé
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  itemQuantity: {
    fontSize: 14,
    color: Colors.textMedium,
    marginTop: 2,
  },
  itemCategory: {
    fontSize: 13,
    color: Colors.textMedium,
    fontStyle: 'italic',
    marginTop: 2,
  },
  itemExpiry: {
    fontSize: 13,
    color: Colors.textMedium,
    marginTop: 5,
  },
  expiryWarningText: {
      fontWeight: 'bold',
      color: '#FFD700', // Jaune/Orange
  },
  expiryExpiredText: {
      fontWeight: 'bold',
      color: '#FF4500', // Rouge vif
  },
  deleteButton: {
    padding: 5,
    marginLeft: 10,
  },
  emptyListContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyListText: {
    fontSize: 16,
    color: Colors.textMedium,
    textAlign: 'center',
  },
});

export default styles;

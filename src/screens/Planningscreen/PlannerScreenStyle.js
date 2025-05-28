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

  // Day Card Styles
  dayCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    elevation: 3,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  dayName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  mealsContainer: {
    marginBottom: 10,
  },
  noMealText: {
    fontSize: 16,
    color: Colors.textMedium,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 10,
  },
  mealItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderColor: Colors.primaryYellow, // Petite touche de couleur
  },
  mealName: {
    fontSize: 16,
    color: Colors.textDark,
    fontWeight: '500',
    flex: 1, // Pour que le texte prenne l'espace et l'icône reste à droite
  },
  removeMealButton: {
    paddingLeft: 10,
  },
  addMealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaf4e1', // Couleur de fond légère pour le bouton d'ajout
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
  },
  addMealButtonText: {
    fontSize: 16,
    color: Colors.buttonPrimary,
    marginLeft: 5,
    fontWeight: 'bold',
  },

  // Modal Styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Fond semi-transparent
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.textDark,
  },
  modalInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    color: Colors.textDark,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '45%',
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#e7e7e7',
  },
  buttonConfirm: {
    backgroundColor: Colors.buttonPrimary,
  },
  textStyle: {
    color: Colors.textLight,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;

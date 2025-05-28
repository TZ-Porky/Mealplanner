import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView, // Assurez-vous que ScrollView est importé
  Dimensions // Pour obtenir la hauteur de l'écran
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../styles/AppStyles';

const { height } = Dimensions.get('window'); // Obtenir la hauteur de l'écran

const RecipeGenerationModal = ({ isVisible, onClose, onGenerate }) => {
  const [numAdults, setNumAdults] = useState('2');
  const [numChildren, setNumChildren] = useState('0');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [availableIngredients, setAvailableIngredients] = useState('');
  const [mealType, setMealType] = useState('');
  const [preferredCuisine, setPreferredCuisine] = useState('');

  const handleGeneratePress = () => {
    if (!numAdults || !numChildren) {
      Alert.alert('Erreur', 'Veuillez indiquer le nombre d\'adultes et d\'enfants.');
      return;
    }
    if (isNaN(parseInt(numAdults, 10)) || isNaN(parseInt(numChildren, 10))) {
      Alert.alert('Erreur', 'Le nombre de personnes doit être un chiffre.');
      return;
    }

    const familyInfo = {
      adults: parseInt(numAdults, 10),
      children: parseInt(numChildren, 10),
      dietaryRestrictions: dietaryRestrictions.trim(),
      availableIngredients: availableIngredients.trim(),
      mealType: mealType.trim(),
      preferredCuisine: preferredCuisine.trim(),
    };

    onGenerate(familyInfo);
    // onClose(); // Vous pouvez choisir de fermer la modale ici ou la laisser ouverte
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.centeredView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // Le keyboardVerticalOffset est important ici pour iOS
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Ajustez si nécessaire
      >
        <View style={styles.modalOverlay}> {/* Nouvelle vue pour l'overlay */}
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close-circle-outline" size={30} color={Colors.textMedium} />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollContent}> {/* ScrollView enveloppe le contenu */}
              <Text style={styles.modalTitle}>Concoctez votre Recette IA !</Text>
              <Text style={styles.descriptionText}>
                Indiquez-nous quelques détails pour que notre IA puisse vous concocter la recette parfaite et sa liste de courses !
              </Text>

              {/* Formulaire */}
              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Composition de la famille</Text>
                <View style={styles.rowInputs}>
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="Nb. Adultes"
                    placeholderTextColor={Colors.textMedium}
                    keyboardType="numeric"
                    value={numAdults}
                    onChangeText={setNumAdults}
                  />
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="Nb. Enfants"
                    placeholderTextColor={Colors.textMedium}
                    keyboardType="numeric"
                    value={numChildren}
                    onChangeText={setNumChildren}
                  />
                </View>

                <Text style={styles.sectionTitle}>Vos préférences</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Restrictions (ex: végétarien, sans gluten)"
                  placeholderTextColor={Colors.textMedium}
                  value={dietaryRestrictions}
                  onChangeText={setDietaryRestrictions}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Ingrédients dispo. (ex: poulet, riz)"
                  placeholderTextColor={Colors.textMedium}
                  value={availableIngredients}
                  onChangeText={setAvailableIngredients}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Type de repas (ex: rapide, copieux)"
                  placeholderTextColor={Colors.textMedium}
                  value={mealType}
                  onChangeText={setMealType}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Cuisine préférée (ex: italienne, asiatique)"
                  placeholderTextColor={Colors.textMedium}
                  value={preferredCuisine}
                  onChangeText={setPreferredCuisine}
                />
              </View>

              <TouchableOpacity style={styles.generateButton} onPress={handleGeneratePress}>
                <Ionicons name="sparkles" size={24} color={Colors.textLight} style={styles.buttonIcon} />
                <Text style={styles.generateButtonText}>Générer ma recette IA</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Le backgroundColor est maintenant sur modalOverlay
  },
  modalOverlay: { // Nouveau style pour l'overlay de fond
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)', // Fond semi-transparent
    width: '100%', // S'assurer qu'il prend toute la largeur
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    padding: 25,
    // alignItems: 'center', // Ne pas aligner les éléments de la ScrollView ici
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    // maxHeight: height * 0.85, // Utilisez une proportion de la hauteur de l'écran
    flex: 1, // Permet à la vue de s'étendre
    // Remove fixed height or maxHeight to let ScrollView manage content
  },
  scrollContent: {
    // Styles pour le contenu de la ScrollView. Important pour le centrage si peu de contenu.
    // Mais ne pas mettre flex: 1 ici, sinon il empêchera le scroll
    alignItems: 'center', // Centre les éléments horizontalement dans le ScrollView
    paddingBottom: 20, // Espace en bas pour le scroll
    // flexGrow: 1, // Permet au contenu de s'étendre mais de scroller si nécessaire
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.textDark,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.textMedium,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  formSection: {
    width: '100%',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 10,
    marginTop: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  input: {
    fontSize: 15,
    color: Colors.textDark,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  halfInput: {
    width: '48%',
  },
  generateButton: {
    backgroundColor: Colors.buttonPrimary,
    borderRadius: 10,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    elevation: 5,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    marginTop: 10,
  },
  generateButtonText: {
    color: Colors.textLight,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 5,
  },
});

export default RecipeGenerationModal;

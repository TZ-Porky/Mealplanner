import React, { useState, useEffect } from 'react';
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
  ScrollView,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../styles/AppStyles';

const { height } = Dimensions.get('window');

const PlanningMealModal = ({ isVisible, onClose, onSaveMeal, initialMealData, date }) => {
  const [mealName, setMealName] = useState('');
  const [mealType, setMealType] = useState('Dîner'); // Type par défaut

  useEffect(() => {
    if (isVisible) {
      if (initialMealData) {
        // Mode édition
        setMealName(initialMealData.name || '');
        setMealType(initialMealData.type || 'Dîner');
      } else {
        // Mode ajout
        setMealName('');
        setMealType('Dîner');
      }
    }
  }, [isVisible, initialMealData]);

  const handleSavePress = () => {
    if (mealName.trim() === '') {
      Alert.alert('Erreur', 'Veuillez saisir le nom du repas.');
      return;
    }

    const mealToSave = {
      id: initialMealData ? initialMealData.id : null, // Garde l'ID si édition
      name: mealName.trim(),
      type: mealType.trim(),
    };

    onSaveMeal(date, mealToSave); // Passe la date et le repas à la fonction de sauvegarde
    onClose();
  };

  const isEditing = !!initialMealData; // True si on est en mode édition

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
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close-circle-outline" size={30} color={Colors.textMedium} />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Text style={styles.modalTitle}>
                {isEditing ? 'Modifier le Repas' : 'Ajouter un Repas'} pour le{' '}
                {date ? date.split('-').reverse().join('/') : ''}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Nom du repas (ex: Poulet Basquaise)"
                placeholderTextColor={Colors.textMedium}
                value={mealName}
                onChangeText={setMealName}
              />

              <Text style={styles.label}>Type de repas :</Text>
              <View style={styles.typeSelector}>
                {['Petit-déjeuner', 'Déjeuner', 'Dîner', 'Collation'].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeButton,
                      mealType === type && styles.typeButtonSelected,
                    ]}
                    onPress={() => setMealType(type)}
                  >
                    <Text
                      style={[
                        styles.typeButtonText,
                        mealType === type && styles.typeButtonTextSelected,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
                <Ionicons
                  name={isEditing ? 'save-outline' : 'add-circle-outline'}
                  size={24}
                  color={Colors.textLight}
                  style={styles.buttonIcon}
                />
                <Text style={styles.saveButtonText}>
                  {isEditing ? 'Enregistrer les modifications' : 'Ajouter ce repas'}
                </Text>
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
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    // maxHeight: height * 0.7, // Ajustez si besoin
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 20,
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
    marginBottom: 20,
    color: Colors.textDark,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: Colors.textDark,
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 16,
    color: Colors.textDark,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    width: '100%',
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  typeButton: {
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  typeButtonSelected: {
    backgroundColor: Colors.buttonPrimary,
    borderColor: Colors.buttonPrimary,
  },
  typeButtonText: {
    color: Colors.textDark,
    fontSize: 14,
    fontWeight: 'bold',
  },
  typeButtonTextSelected: {
    color: Colors.textLight,
  },
  saveButton: {
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
  saveButtonText: {
    color: Colors.textLight,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 5,
  },
});

export default PlanningMealModal;

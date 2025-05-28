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

const AddItemModal = ({ isVisible, onClose, onAddItem, type, initialData = {} }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [expiryDate, setExpiryDate] = useState(''); // Spécifique aux stocks

  // Réinitialise les champs et préremplit si initialData est fourni (pour une édition future)
  useEffect(() => {
    if (isVisible) {
      setName(initialData.name || '');
      setQuantity(initialData.quantity || '');
      setCategory(initialData.category || '');
      setExpiryDate(initialData.expiryDate || '');
    }
  }, [isVisible, initialData]);

  const handleAddItemPress = () => {
    if (name.trim() === '') {
      Alert.alert('Erreur', `Veuillez saisir le nom de l'${type === 'stock' ? 'ingrédient' : 'article'}.`);
      return;
    }

    const item = {
      name: name.trim(),
      quantity: quantity.trim(),
      category: category.trim(),
    };

    if (type === 'stock') {
      // Validation simple de la date pour les stocks
      if (expiryDate.trim() !== '' && !/^\d{4}-\d{2}-\d{2}$/.test(expiryDate.trim())) {
        Alert.alert('Erreur', 'Le format de la date de péremption doit être AAAA-MM-JJ.');
        return;
      }
      item.expiryDate = expiryDate.trim() || 'N/A';
    }

    onAddItem(item); // Passe l'objet complet à la fonction parente
    onClose(); // Ferme la modale
    // Réinitialise les champs après ajout réussi
    setName('');
    setQuantity('');
    setCategory('');
    setExpiryDate('');
  };

  const modalTitle = type === 'stock' ? 'Ajouter un ingrédient au stock' : 'Ajouter un article à la liste';
  const namePlaceholder = type === 'stock' ? "Nom de l'ingrédient" : "Nom de l'article";
  const buttonText = type === 'stock' ? 'Ajouter au Stock' : 'Ajouter à la Liste';

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
              <Text style={styles.modalTitle}>{modalTitle}</Text>

              <TextInput
                style={styles.input}
                placeholder={namePlaceholder}
                placeholderTextColor={Colors.textMedium}
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Quantité (ex: 500g, 2 pièces)"
                placeholderTextColor={Colors.textMedium}
                value={quantity}
                onChangeText={setQuantity}
              />
              <TextInput
                style={styles.input}
                placeholder="Catégorie (ex: Légumes, Fruits, Épicerie)"
                placeholderTextColor={Colors.textMedium}
                value={category}
                onChangeText={setCategory}
              />

              {type === 'stock' && ( // Champ de date de péremption uniquement pour les stocks
                <TextInput
                  style={styles.input}
                  placeholder="Date de péremption (AAAA-MM-JJ)"
                  placeholderTextColor={Colors.textMedium}
                  value={expiryDate}
                  onChangeText={setExpiryDate}
                />
              )}

              <TouchableOpacity style={styles.addButton} onPress={handleAddItemPress}>
                <Ionicons name="add-circle-outline" size={24} color={Colors.textLight} style={styles.buttonIcon} />
                <Text style={styles.addButtonText}>{buttonText}</Text>
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
    // maxHeight: height * 0.75, // Ajuster selon le contenu et l'écran
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
  addButton: {
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
  addButtonText: {
    color: Colors.textLight,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 5,
  },
});

export default AddItemModal;

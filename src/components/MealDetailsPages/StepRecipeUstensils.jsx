/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Button from '../common/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ustensile from '../../models/Ustensile';

const StepRecipeUstensils = ({onNext, onBack, initialData}) => {
  const [currentUstensilName, setCurrentUstensilName] = useState('');
  const [currentUstensilQty, setCurrentUstensilQty] = useState('');
  const [ustensils, setUstensils] = useState(initialData.ustensils || []);

  const handleAddUstensil = () => {
    if (!currentUstensilName || !currentUstensilQty) {
      Alert.alert(
        'Erreur',
        "Veuillez remplir le nom et la quantité de l'ustensile.",
      );
      return;
    }
    if (
      isNaN(parseInt(currentUstensilQty, 10)) ||
      parseInt(currentUstensilQty, 10) <= 0
    ) {
      Alert.alert(
        'Erreur',
        'La quantité doit être un nombre valide et supérieur à 0.',
      );
      return;
    }
    // Crée une nouvelle instance de Ustensile avec les noms de propriétés mis à jour
    const newUstensil = new Ustensile(
      currentUstensilName,
      parseInt(currentUstensilQty, 10)
      // pas besoin de prixUnitaire/unitCost ou imageUrl si non utilisés ici
    );
    setUstensils([...ustensils, newUstensil]);
    setCurrentUstensilName('');
    setCurrentUstensilQty('');
  };

  const handleRemoveUstensil = (indexToRemove) => {
    setUstensils(ustensils.filter((_, index) => index !== indexToRemove));
  };

  const handleNextStep = () => {
    onNext({ ustensils });
  };

  return (
    <ScrollView style={stepStyles.scrollView} keyboardShouldPersistTaps="handled">
      <View style={stepStyles.section}>
        <Text style={stepStyles.sectionTitle}>Ustensiles nécessaires</Text>

        <TextInput
          style={stepStyles.input}
          placeholder="Nom de l'ustensile (ex: Casserole)"
          value={currentUstensilName}
          onChangeText={setCurrentUstensilName}
        />
        <TextInput
          style={stepStyles.input}
          placeholder="Quantité (ex: 1)"
          keyboardType="numeric"
          value={currentUstensilQty}
          onChangeText={setCurrentUstensilQty}
        />
        <Button title="Ajouter l'ustensile" onPress={handleAddUstensil} />

        <View style={stepStyles.listContainer}>
          <Text style={stepStyles.sectionTitle}>Liste des ustensiles</Text>
          {ustensils.map((ust, index) => (
            <View key={index} style={stepStyles.listItem}>
              {/* Accéder aux propriétés avec les NOUVEAUX NOMS d'attributs */}
              <Text>{`${ust.name} - ${ust.quantity}`}</Text>
              <TouchableOpacity onPress={() => handleRemoveUstensil(index)}>
                <Ionicons name="close-circle" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={stepStyles.buttonRow}>
        <Button
          title="Retour"
          onPress={onBack}
          outlined={true}
          style={{flex: 1, marginRight: 10}}
        />
        <Button title="Suivant" onPress={handleNextStep} style={{flex: 2}} />
      </View>
    </ScrollView>
  );
};

const stepStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40, // Pour laisser de l'espace en bas
  },
  // Ajoutez d'autres styles si nécessaire
});

export default StepRecipeUstensils;

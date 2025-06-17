/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../common/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StepRecipeInstructions = ({ onNext, onBack, initialData }) => {
  const [currentInstruction, setCurrentInstruction] = useState('');
  const [instructions, setInstructions] = useState(initialData.instructions || []);

  const handleAddInstruction = () => {
    if (currentInstruction.trim()) {
      setInstructions([...instructions, currentInstruction.trim()]);
      setCurrentInstruction('');
    } else {
      Alert.alert('Erreur', 'Veuillez entrer une instruction valide.');
    }
  };

  const handleRemoveInstruction = (indexToRemove) => {
    setInstructions(instructions.filter((_, index) => index !== indexToRemove));
  };

  const handleNextStep = () => {
    if (instructions.length === 0) {
      Alert.alert('Attention', 'Veuillez ajouter au moins une instruction pour la recette.');
      return;
    }
    onNext({ instructions });
  };

  return (
    <ScrollView style={stepStyles.scrollView} keyboardShouldPersistTaps="handled">
      <View style={stepStyles.section}>
        <Text style={stepStyles.sectionTitle}>Instructions de préparation</Text>

        <TextInput
          style={[stepStyles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Ajouter une étape de préparation..."
          multiline
          value={currentInstruction}
          onChangeText={setCurrentInstruction}
        />
        <Button title="Ajouter l'instruction" onPress={handleAddInstruction} />

        <View style={stepStyles.listContainer}>
          {instructions.map((inst, index) => (
            <View key={index} style={stepStyles.listItem}>
              <Text>{`${index + 1}. ${inst}`}</Text>
              <TouchableOpacity onPress={() => handleRemoveInstruction(index)}>
                <Ionicons name="close-circle" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={stepStyles.buttonRow}>
        <Button title="Retour" onPress={onBack} outlined={true} style={{ flex: 1, marginRight: 10 }} />
        <Button title="Suivant" onPress={handleNextStep} style={{ flex: 2 }} />
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
    marginBottom: 40,
  },
});

export default StepRecipeInstructions;

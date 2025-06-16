/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../../../components/common/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StepRecipeTagsAndFinish = ({ onNext, onBack, initialData }) => {
  const [currentTag, setCurrentTag] = useState('');
  const [tags, setTags] = useState(initialData.tags || []);

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    } else if (tags.includes(currentTag.trim())) {
      Alert.alert('Information', 'Ce tag existe déjà.');
    } else {
      Alert.alert('Erreur', 'Veuillez entrer un tag valide.');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    onNext({ tags }); // onNext est configuré dans le parent pour appeler handleSubmitRecipe si c'est la dernière étape
  };

  return (
    <ScrollView style={stepStyles.scrollView} keyboardShouldPersistTaps="handled">
      <View style={stepStyles.section}>
        <Text style={stepStyles.sectionTitle}>Tags (Mots-clés)</Text>
        <TextInput
          style={stepStyles.input}
          placeholder="Ajouter un tag (ex: rapide, végétarien)"
          value={currentTag}
          onChangeText={setCurrentTag}
          onSubmitEditing={handleAddTag} // Permet d'ajouter un tag en appuyant sur Entrée
        />
        <Button title="Ajouter le tag" onPress={handleAddTag} />

        <View style={stepStyles.tagsContainer}>
          {tags.map((tag, index) => (
            <TouchableOpacity key={index} style={stepStyles.tag} onPress={() => handleRemoveTag(tag)}>
              <Text style={stepStyles.tagText}>{tag}</Text>
              <Ionicons name="close-circle-outline" size={16} color="#fff" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={stepStyles.buttonRow}>
        <Button title="Retour" onPress={onBack} outlined={true} style={{ flex: 1, marginRight: 10 }} />
        <Button title="Terminer et Ajouter" onPress={handleSubmit} style={{ flex: 2 }} />
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3c09e', // Couleur orange
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40,
  },
});

export default StepRecipeTagsAndFinish;

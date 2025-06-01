import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './TagInputStyles';
import { Fonts } from '../../styles/AppStyles';

// Tags compatibles avec ce que nous avons utilisé (ex: de MarketScreen)
const COMMON_TAGS = ['Easy', 'Medium', 'Hard', '5 Stars', 'Quick', 'Healthy', 'Vegetarian', 'Vegan'];

const TagInput = ({ label, selectedTags, onTagsChange }) => {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag && !selectedTags.includes(newTag)) {
      onTagsChange([...selectedTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    onTagsChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleSelectSuggestedTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      {/* Affichage des tags sélectionnés */}
      <View style={styles.tagsDisplayContainer}>
        {selectedTags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
            <TouchableOpacity onPress={() => handleRemoveTag(tag)} style={styles.removeTagButton}>
              <Icon name="close-circle-outline" size={Fonts.sizes.medium} style={styles.removeTagIcon} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Champ de saisie pour de nouveaux tags */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new tag"
          value={newTag}
          onChangeText={setNewTag}
          onSubmitEditing={handleAddTag} // Ajouter le tag quand on appuie sur Entrée
          returnKeyType="done"
        />
        <TouchableOpacity onPress={handleAddTag} style={styles.addTagButton}>
          <Text style={styles.addTagText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Tags suggérés */}
      <Text style={styles.label}>Suggested Tags:</Text>
      <View style={styles.suggestedTagsContainer}>
        {COMMON_TAGS.filter(tag => !selectedTags.includes(tag)).map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={styles.suggestedTagButton}
            onPress={() => handleSelectSuggestedTag(tag)}
          >
            <Text style={styles.suggestedTagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TagInput;

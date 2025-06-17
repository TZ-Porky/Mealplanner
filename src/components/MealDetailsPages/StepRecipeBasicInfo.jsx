/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Button from '../common/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';

const InputWithIcon = ({icon, label, ...props}) => (
  <View style={stepStyles.inputGroup}>
    <Text style={stepStyles.label}>{label}</Text>
    <View style={stepStyles.inputContainer}>
      <Ionicons name={icon} size={20} color="#888" style={stepStyles.icon} />
      <TextInput style={stepStyles.input} {...props} />
    </View>
  </View>
);

const StepRecipeBasicInfo = ({onNext, initialData}) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [preparationTimeMinutes, setPreparationTimeMinutes] = useState(
    initialData.preparationTimeMinutes
      ? String(initialData.preparationTimeMinutes)
      : '',
  );
  const [servings, setServings] = useState(
    initialData.servings ? String(initialData.servings) : '',
  );
  const [difficulty, setDifficulty] = useState(initialData.difficulty || 1);
  const [category, setCategory] = useState(initialData.category || 'Non spécifiée');

  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.7,
      includeBase64: true,
      maxHeight: 200,
      maxWidth: 200,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
        Alert.alert(
          'Erreur Image',
          "Une erreur est survenue lors de la sélection de l'image.",
        );
      } else if (response.assets && response.assets.length > 0) {
        const source = response.assets[0];
        console.log('Image selected URI:', source.uri);
        setImageUrl(`data:${source.type};base64,${source.base64}`);
      }
    });
  };

  const handleNextStep = () => {
    // Trim whitespace from string inputs
    const trimmedTitle = title.trim();
    const trimmedImageUrl = imageUrl.trim();
    const trimmedDescription = description.trim();
    const parsedPreparationTime = parseInt(preparationTimeMinutes, 10);
    const parsedServings = parseInt(servings, 10); // Changed from 'portions' to 'servings'

    // Validate inputs
    if (!trimmedTitle) {
      Alert.alert('Erreur', 'Veuillez entrer un titre pour la recette.');
      return;
    }
    if (!trimmedDescription) {
      Alert.alert('Erreur', 'Veuillez entrer une description pour la recette.');
      return;
    }
    if (isNaN(parsedPreparationTime) || parsedPreparationTime <= 0) {
      Alert.alert(
        'Erreur',
        'Veuillez entrer un temps de préparation valide (en minutes) supérieur à 0.',
      );
      return;
    }
    if (isNaN(parsedServings) || parsedServings <= 0) {
      Alert.alert(
        'Erreur',
        'Veuillez entrer un nombre de portions valide supérieur à 0.',
      );
      return;
    }
    if (!category || category === 'Non spécifiée') {
      Alert.alert('Erreur', 'Veuillez sélectionner une catégorie.');
      return;
    }
    if (!difficulty) {
        Alert.alert('Erreur', 'Veuillez sélectionner une difficulté.');
        return;
    }

    // If all validations pass, call onNext with the data
    onNext({
      title: trimmedTitle,
      imageUrl: trimmedImageUrl,
      description: trimmedDescription,
      preparationTimeMinutes: parsedPreparationTime,
      servings: parsedServings, // Changed from 'portions' to 'servings'
      difficulty: difficulty,
      category: category,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView style={stepStyles.scrollView} keyboardShouldPersistTaps="handled">
        <View style={stepStyles.section}>
          <InputWithIcon
            icon="book"
            label="Titre de la Recette"
            placeholder="Ex: Poulet Yassa"
            value={title}
            onChangeText={setTitle}
          />
          <View style={stepStyles.inputGroup}>
            <Text style={stepStyles.label}>Image de la recette</Text>
            <TouchableOpacity
              onPress={handleChoosePhoto}
              style={stepStyles.imagePickerButton}>
              {imageUrl ? (
                <Image source={{uri: imageUrl}} style={stepStyles.imagePreview} />
              ) : (
                <Ionicons name="camera-outline" size={30} color="#888" />
              )}
              {imageUrl ? (
                <Text style={stepStyles.imagePickerButtonText} />
              ) : (
                <Text style={stepStyles.imagePickerButtonText}>
                  Appuyez pour choisir une image
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <InputWithIcon
            icon="document-text"
            label="Description de la Recette"
            placeholder="Ex: Un plat sénégalais délicieux..."
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={4}
            style={[stepStyles.input, {height: 100, textAlignVertical: 'top'}]}
          />

          <View style={stepStyles.row}>
            <View style={{flex: 1, marginRight: 10}}>
              <InputWithIcon
                icon="time"
                label="Temps de Préparation (min)"
                placeholder="Ex: 30"
                value={preparationTimeMinutes}
                onChangeText={setPreparationTimeMinutes}
                keyboardType="number-pad"
              />
            </View>
            <View style={{flex: 1}}>
              <InputWithIcon
                icon="people"
                label="Nombre de Portions"
                placeholder="Ex: 4"
                value={servings}
                onChangeText={setServings}
                keyboardType="number-pad"
              />
            </View>
          </View>

          <View style={stepStyles.inputGroup}>
            <Text style={stepStyles.label}>Difficulté</Text>
            <View style={stepStyles.pickerContainer}>
              <Picker
                selectedValue={difficulty}
                onValueChange={itemValue => setDifficulty(itemValue)}>
                <Picker.Item label="Très Facile" value={1} />
                <Picker.Item label="Facile" value={2} />
                <Picker.Item label="Moyenne" value={3} />
                <Picker.Item label="Difficile" value={4} />
                <Picker.Item label="Très Difficile" value={5} />
              </Picker>
            </View>
          </View>

          <View style={stepStyles.inputGroup}>
            <Text style={stepStyles.label}>Catégorie</Text>
            <View style={stepStyles.pickerContainer}>
              <Picker
                selectedValue={category}
                onValueChange={itemValue => setCategory(itemValue)}>
                <Picker.Item label="Non spécifiée" value="Non spécifiée" />
                <Picker.Item label="Plat Principal" value="Plat Principal" />
                <Picker.Item label="Dessert" value="Dessert" />
                <Picker.Item label="Petit-déjeuner" value="Petit-déjeuner" />
                <Picker.Item label="Boisson" value="Boisson" />
                <Picker.Item label="Végétarien" value="Végétarien" />
                <Picker.Item label="Vegan" value="Vegan" />
                <Picker.Item label="Sans Gluten" value="Gluten-Free" />
                {/* Ajoute d'autres catégories si nécessaire */}
              </Picker>
            </View>
          </View>
        </View>

        <Button
          title="Suivant"
          onPress={handleNextStep}
          style={stepStyles.nextButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
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
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  imagePickerButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    height: 150,
    overflow: 'hidden',
  },
  imagePickerButtonText: {
    marginTop: 10,
    color: '#666',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  nextButton: {
    marginTop: 20,
    marginBottom: 20,
  },
});


export default StepRecipeBasicInfo;

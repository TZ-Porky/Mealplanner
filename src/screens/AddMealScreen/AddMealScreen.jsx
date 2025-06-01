/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
  Modal, // Importez Modal si vous en avez besoin pour d'autres usages dans cet écran
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
// -------------------------------------------------------------- //
import styles from './AddMealScreenStyles';
// Import des nouveaux composants de modale
import ListInputModal from '../../components/common/ListInputModal';
import MultilineTextInputModal from '../../components/common/MutliLineInputModal';
import { Fonts, Layout, Colors } from '../../styles/AppStyles'; // Assurez-vous que le chemin vers vos constantes est correct.

// Composant InputWithIcon légèrement adapté pour les champs avec le bouton '+'
const InputWithIcon = ({ icon, multiline, numberOfLines, isActionField, onActionButtonPress, placeholder, value, onChangeText, ...props }) => (
  <View style={[styles.inputContainer, multiline && styles.multilineInput, isActionField && styles.actionFieldInputContainer]}>
    {icon && <Ionicons name={icon} size={24} color={Colors.iconColor} style={styles.icon} />}
    <TextInput
      style={[styles.input, multiline && styles.multilineInput, isActionField && styles.actionFieldInput]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      editable={!isActionField} // Rendre non éditable si c'est un champ d'action (avec le +)
      {...props}
    />
    {isActionField && (
      <TouchableOpacity onPress={onActionButtonPress} style={styles.actionButton}>
        <Ionicons name="add-circle" size={Fonts.sizes.xLarge} style={styles.actionButtonIcon} />
      </TouchableOpacity>
    )}
  </View>
);

const AddMealScreen = () => {
  const navigation = useNavigation();

  // États pour les champs du formulaire
  const [mealName, setMealName] = useState('');
  const [serving, setServing] = useState('');
  const [time, setTime] = useState('');

  // États pour les modales et leurs données
  const [ingredients, setIngredients] = useState([]); // Tableau d'ingrédients
  const [cookware, setCookware] = useState([]); // Tableau d'ustensiles
  const [instructions, setInstructions] = useState(''); // Texte des instructions

  // Visibilité des modales
  const [isIngredientsModalVisible, setIsIngredientsModalVisible] = useState(false);
  const [isCookwareModalVisible, setIsCookwareModalVisible] = useState(false);
  const [isInstructionsModalVisible, setIsInstructionsModalVisible] = useState(false);

  const [mealImage, setMealImage] = useState(null); // Pour l'URI de l'image sélectionnée

  // --- Gestion de l'image ---
  const handleChooseImage = () => {
    Alert.alert(
      'Add Image',
      'Choose image source',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Camera',
          onPress: () => {
            // Implémentation réelle avec ImagePicker pour la caméra
            Alert.alert('Camera', 'Camera functionality not fully implemented.');
            setMealImage('https://via.placeholder.com/150/FF0000/FFFFFF?text=Meal+Image'); // Placeholder pour la démo
          }
        },
        {
          text: 'Gallery',
          onPress: () => {
            // Implémentation réelle avec ImagePicker pour la galerie
            Alert.alert('Gallery', 'Gallery functionality not fully implemented.');
            setMealImage('https://via.placeholder.com/150/0000FF/FFFFFF?text=Meal+Image'); // Placeholder pour la démo
          }
        },
      ]
    );
  };

  // --- Gestion de la soumission du formulaire ---
  const handleFinish = () => {
    // Validation minimale des champs
    if (!mealName || !serving || !time || ingredients.length === 0 || cookware.length === 0 || !instructions) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    // Préparer les données pour l'ajout
    const newMealData = {
      id: `new-meal-${Date.now()}`,
      name: mealName,
      serving: serving,
      time: time,
      ingredients: ingredients,
      cookware: cookware,
      instructions: instructions,
      image: mealImage,
    };

    console.log('New Meal Data:', newMealData);
    Alert.alert('Success', 'Meal added successfully! (Check console for data)');
    // Ici, vous enverriez ces données à votre backend ou les ajouteriez à votre état global.
    navigation.goBack(); // Revenir à l'écran précédent après ajout
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.flatListContentContainer}
        keyboardShouldPersistTaps="handled">

        {/* ===================== | Header |======================= */}
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            {/* Bouton de retour */}
            <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
              <Ionicons name="arrow-back" size={Fonts.sizes.xLarge} color={Colors.textLight} />
            </TouchableOpacity>
            {/* Bouton pour ajouter une image */}
            <TouchableOpacity onPress={handleChooseImage} style={styles.headerButton}>
              <Ionicons name="image" size={Fonts.sizes.xLarge} color={Colors.textLight} />
            </TouchableOpacity>
          </View>

          {mealImage && (
            <Image source={{ uri: mealImage }} style={styles.mealImagePreview} />
          )}

          <Text style={styles.title}>Add Meal</Text>
        </View>

        {/* ===================== | Fields Forms |======================= */}
        <View style={styles.body}>
          {/* Nom du repas */}
          <View style={styles.field}>
            <Text style={styles.label}>Name</Text>
            <InputWithIcon
              placeholder="Enter Name of Ingredient"
              value={mealName}
              onChangeText={setMealName}
              keyboardType="default"
            />
          </View>

          {/* Serving */}
          <View style={styles.field}>
            <Text style={styles.label}>Serving</Text>
            <InputWithIcon
              placeholder="Enter Number of serving"
              value={serving}
              onChangeText={setServing}
              keyboardType="numeric"
            />
          </View>

          {/* Time */}
          <View style={styles.field}>
            <Text style={styles.label}>Time</Text>
            <InputWithIcon
              placeholder="Enter Time"
              value={time}
              onChangeText={setTime}
              keyboardType="default"
            />
          </View>

          {/* Add Ingredients */}
          <View style={styles.field}>
            <Text style={styles.label}>Add Ingredients</Text>
            <InputWithIcon
              isActionField={true}
              onActionButtonPress={() => setIsIngredientsModalVisible(true)}
              placeholder={ingredients.length > 0 ? ingredients.join(', ') : 'Select Ingredients'}
              value={ingredients.length > 0 ? ingredients.join(', ') : ''} // Afficher les ingrédients sélectionnés
              editable={false}
            />
          </View>

          {/* Add Cookware */}
          <View style={styles.field}>
            <Text style={styles.label}>Add Cookware</Text>
            <InputWithIcon
              isActionField={true}
              onActionButtonPress={() => setIsCookwareModalVisible(true)}
              placeholder={cookware.length > 0 ? cookware.join(', ') : 'Add Cookware'}
              value={cookware.length > 0 ? cookware.join(', ') : ''} // Afficher les ustensiles sélectionnés
              editable={false}
            />
          </View>

          {/* Add Instructions */}
          <View style={styles.field}>
            <Text style={styles.label}>Add Instructions</Text>
            <InputWithIcon
              isActionField={true}
              onActionButtonPress={() => setIsInstructionsModalVisible(true)}
              placeholder={instructions ? instructions.substring(0, 50) + '...' : 'Add Instruction'} // Aperçu des instructions
              value={instructions} // La valeur est le texte des instructions
              editable={false}
            />
          </View>

        </View>

        {/* ===================== | Footer Buttons |======================= */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFinish} style={styles.finishButton}>
            <Text style={styles.finishButtonText}>Finish</Text>
          </TouchableOpacity>
        </View>

        {/* ===================== | Modals |======================= */}
        <ListInputModal
          visible={isIngredientsModalVisible}
          onClose={() => setIsIngredientsModalVisible(false)}
          title="Ingredients"
          data={ingredients}
          onSave={setIngredients}
        />

        <ListInputModal
          visible={isCookwareModalVisible}
          onClose={() => setIsCookwareModalVisible(false)}
          title="Cookware"
          data={cookware}
          onSave={setCookware}
        />

        <MultilineTextInputModal
          visible={isInstructionsModalVisible}
          onClose={() => setIsInstructionsModalVisible(false)}
          title="Instructions"
          initialValue={instructions}
          onSave={setInstructions}
        />

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddMealScreen;

/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
<<<<<<< HEAD

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import RecipeServices from '../../services/RecipeServices'; // Importe le service de recette
import Recette from '../../models/Recette'; // Importe le modèle Recette
import AuthServices from '../../services/AuthServices'; // Pour obtenir l'UID de l'utilisateur
import StepRecipeBasicInfo from '../../components/MealDetailsPages/StepRecipeBasicInfo';
import StepRecipeIngredients from '../../components/MealDetailsPages/StepRecipeIngredients';
import StepRecipeUstensils from '../../components/MealDetailsPages/StepRecipeUstensils';
import StepRecipeInstructions from '../../components/MealDetailsPages/StepRecipeInstructions';
import StepRecipeTagsAndFinish from '../../components/MealDetailsPages/StepRecipeTagsAndFinish';
=======
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// -------------------------------------------------------------- //
import styles from './AddMealScreenStyles';
// Import des nouveaux composants de modale
import ListInputModal from '../../components/common/ListInputModal';
import MultilineTextInputModal from '../../components/common/MutliLineInputModal';
import { Fonts, Layout, Colors } from '../../styles/AppStyles'; // Assurez-vous que le chemin vers vos constantes est correct.
>>>>>>> origin/dev

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  stepBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  stepBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
    marginHorizontal: 2,
  },
  activeStepBar: {
    backgroundColor: '#f3c09e', // Couleur active
  },
});

export default function AddMealScreen() {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [recipeData, setRecipeData] = useState({
    id: null,
    title: '',
    imageUrl: '',
    description: '',
    ingredients: [],
    instructions: [],
    ustensils: [],
    servings: '',
    preparationTimeMinutes: '',
    difficulty: 1,
    tags: [],
    category: 'Unspecified', // Changé de 'categorie'
    userId: null,
    rating: 0,
  });
  const [loading, setLoading] = useState(false);

  const totalSteps = 5; // Total des étapes du formulaire

<<<<<<< HEAD
  const handleNext = (data) => {
    setRecipeData(prev => ({ ...prev, ...data }));
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Dernière étape, soumettre la recette
      handleSubmitRecipe();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigation.goBack(); // Revenir à l'écran précédent si première étape
    }
  };

  const handleSubmitRecipe = async () => {
    setLoading(true);
    try {
      const user = await AuthServices.getCurrentUser();
      if (!user) {
        Alert.alert('Erreur', 'Vous devez être connecté pour ajouter une recette.');
        setLoading(false);
        return;
      }

      // Créer une instance de Recette avec les données complétées
      const newRecipe = new Recette(
        null, // L'ID sera généré par Firestore
        recipeData.title,
        recipeData.imageUrl,
        recipeData.description, // Passage de la description
        recipeData.ingredients,
        recipeData.instructions,
        recipeData.ustensils,
        parseInt(recipeData.servings, 10),
        parseInt(recipeData.preparationTimeMinutes, 10),
        parseInt(recipeData.difficulty, 10),
        recipeData.tags,
        recipeData.category,
        user.uid, // Assigner l'UID de l'utilisateur courant
        new Date(), // Date de création
        recipeData.rating
      );

      await RecipeServices.createRecipe(newRecipe);
      Alert.alert('Succès', 'Recette ajoutée avec succès !');
      navigation.goBack(); // Ou naviguer vers les détails de la recette
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'ajouter la recette : ' + error.message);
      console.error('Erreur soumission recette:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepRecipeBasicInfo onNext={handleNext} initialData={recipeData} />;
      case 2:
        return <StepRecipeIngredients onNext={handleNext} onBack={handleBack} initialData={recipeData} />;
      case 3:
        return <StepRecipeUstensils onNext={handleNext} onBack={handleBack} initialData={recipeData} />;
      case 4:
        return <StepRecipeInstructions onNext={handleNext} onBack={handleBack} initialData={recipeData} />;
      case 5:
        return <StepRecipeTagsAndFinish onNext={handleNext} onBack={handleBack} initialData={recipeData} />;
      default:
        return null;
    }
=======
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

  const handleFinish = async () => {
    // Validation
    if (!mealName || !serving || !time || ingredients.length === 0 || cookware.length === 0 || !instructions) {
      return Alert.alert('Error', 'Please fill all required fields.');
    }

    // Préparation des données
    const user = auth().currentUser;
    const newMealData = {
      name: mealName.trim(),
      servings: parseInt(serving, 10),
      time: time.trim(),
      ingredients,
      cookware,
      instructions,
      image: mealImage,           // URI string ou null
      creatorUid: user?.uid || null,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    try {
      // Enregistrement dans Firestore
      await firestore()
        .collection('recipes')
        .add(newMealData);

      Alert.alert('Success', 'Meal added successfully!');
      navigation.goBack();
    } catch (err) {
      console.error('Firestore error:', err);
      Alert.alert('Error', "Impossible d'ajouter le plat. Réessaie plus tard.");
    }
  };
  const handleCancel = () => {
    navigation.goBack();
>>>>>>> origin/dev
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.header}>
        <Text style={commonStyles.title}>Ajouter une Recette</Text>
        <Text style={commonStyles.subtitle}>{`Étape ${currentStep} sur ${totalSteps}`}</Text>
      </View>
      <View style={commonStyles.stepBarContainer}>
        {[...Array(totalSteps)].map((_, index) => (
          <View
            key={index}
            style={[
              commonStyles.stepBar,
              index + 1 === currentStep && commonStyles.activeStepBar,
            ]}
          />
        ))}
      </View>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#f3c09e" />
          <Text style={{ marginTop: 10 }}>Enregistrement de la recette...</Text>
        </View>
      ) : (
        renderStep()
      )}
    </View>
  );
}

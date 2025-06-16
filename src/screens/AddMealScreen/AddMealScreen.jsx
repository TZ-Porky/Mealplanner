/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import RecipeServices from '../../services/RecipeServices'; // Importe le service de recette
import Recette from '../../models/Recette'; // Importe le modèle Recette
import AuthServices from '../../services/AuthServices'; // Pour obtenir l'UID de l'utilisateur
import StepRecipeBasicInfo from './AddSteps/StepRecipeBasicInfo';
import StepRecipeIngredients from './AddSteps/StepRecipeIngredients';
import StepRecipeUstensils from './AddSteps/StepRecipeUstensils';
import StepRecipeInstructions from './AddSteps/StepRecipeInstructions';
import StepRecipeTagsAndFinish from './AddSteps/StepRecipeTagsAndFinish';

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
    title: '', // Changé de 'titre'
    imageUrl: '',
    description: '', // Ajouté
    ingredients: [],
    instructions: [],
    ustensils: [], // Changé de 'ustensiles'
    servings: '', // Changé de 'portions'
    preparationTimeMinutes: '', // Changé de 'tempsPreparationMinutes'
    difficulty: 1, // Changé de 'difficulte'
    tags: [],
    category: 'Unspecified', // Changé de 'categorie'
    userId: null,
    rating: 0,
  });
  const [loading, setLoading] = useState(false);

  const totalSteps = 5; // Total des étapes du formulaire

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

/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import RecipeServices from '../../services/RecipeServices';
import Recette from '../../models/Recette';
import AuthServices from '../../services/AuthServices';
import StepRecipeBasicInfo from '../../components/MealDetailsPages/StepRecipeBasicInfo';
import StepRecipeIngredients from '../../components/MealDetailsPages/StepRecipeIngredients';
import StepRecipeUstensils from '../../components/MealDetailsPages/StepRecipeUstensils';
import StepRecipeInstructions from '../../components/MealDetailsPages/StepRecipeInstructions';
import StepRecipeTagsAndFinish from '../../components/MealDetailsPages/StepRecipeTagsAndFinish';

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
    height: 5,
    backgroundColor: '#eee',
    marginHorizontal: 3,
    borderRadius: 5,
  },
  activeStepBar: {
    backgroundColor: '#f3c09e',
  },
});

const EditMealScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {recipe} = route.params;

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [recipeData, setRecipeData] = useState({
    id: recipe.id,
    title: recipe.title,
    imageUrl: recipe.imageUrl,
    description: recipe.description || '',
    preparationTimeMinutes: recipe.preparationTimeMinutes,
    servings: recipe.servings,
    difficulty: recipe.difficulty,
    category: recipe.category,
    ingredients: recipe.ingredients,
    ustensils: recipe.utensils,
    instructions: recipe.instructions,
    tags: recipe.tags,
    userId: recipe.userId,
    dateCreation: recipe.dateCreation,
    rating: recipe.rating,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (recipe) {
      setRecipeData({
        id: recipe.id,
        title: recipe.title,
        imageUrl: recipe.imageUrl,
        description: recipe.description || '',
        preparationTimeMinutes: recipe.preparationTimeMinutes,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        category: recipe.category,
        ingredients: recipe.ingredients,
        ustensils: recipe.utensils,
        instructions: recipe.instructions,
        tags: recipe.tags,
        userId: recipe.userId,
        dateCreation: recipe.dateCreation,
        rating: recipe.rating,
      });
    }
  }, [recipe]);

  const handleNext = data => {
    setRecipeData(prevData => ({...prevData, ...data}));
    if (currentStep < totalSteps) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      handleSubmitRecipe();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    } else {
      navigation.goBack(); // Revenir à l'écran précédent si c'est la première étape
    }
  };

  const handleSubmitRecipe = async () => {
    setLoading(true);
    try {
      const currentUser = await AuthServices.getCurrentUser();
      if (!currentUser || !currentUser.uid) {
        Alert.alert(
          'Erreur',
          'Vous devez être connecté pour modifier une recette.',
        );
        setLoading(false);
        return;
      }

      // Créer une nouvelle instance de Recette avec les données mises à jour
      const updatedRecipe = new Recette(
        recipeData.id,
        recipeData.title,
        recipeData.imageUrl,
        recipeData.description,
        recipeData.ingredients,
        recipeData.instructions,
        recipeData.ustensils,
        recipeData.servings,
        recipeData.preparationTimeMinutes,
        recipeData.difficulty,
        recipeData.tags,
        recipeData.category,
        recipeData.userId,
        recipeData.dateCreation,
        recipeData.rating,
      );

      await RecipeServices.updateRecipe(
        updatedRecipe.id,
        updatedRecipe.toPlainObject(),
      );

      Alert.alert('Succès', 'Recette mise à jour avec succès !');
      navigation.goBack(); // Revenir à l'écran de détail après l'édition
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la recette :', error);
      Alert.alert(
        'Erreur',
        'Échec de la mise à jour de la recette. Veuillez réessayer.',
      );
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepRecipeBasicInfo onNext={handleNext} initialData={recipeData} />
        );
      case 2:
        return (
          <StepRecipeIngredients
            onNext={handleNext}
            onBack={handleBack}
            initialData={recipeData}
          />
        );
      case 3:
        return (
          <StepRecipeUstensils
            onNext={handleNext}
            onBack={handleBack}
            initialData={recipeData}
          />
        );
      case 4:
        return (
          <StepRecipeInstructions
            onNext={handleNext}
            onBack={handleBack}
            initialData={recipeData}
          />
        );
      case 5:
        return (
          <StepRecipeTagsAndFinish
            onNext={handleNext}
            onBack={handleBack}
            initialData={recipeData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.header}>
        <Text style={commonStyles.title}>Modifier une Recette</Text>
        <Text
          style={
            commonStyles.subtitle
          }>{`Étape ${currentStep} sur ${totalSteps}`}</Text>
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#f3c09e" />
          <Text style={{marginTop: 10}}>
            Enregistrement des modifications...
          </Text>
        </View>
      ) : (
        renderStepContent()
      )}
    </View>
  );
};

export default EditMealScreen;

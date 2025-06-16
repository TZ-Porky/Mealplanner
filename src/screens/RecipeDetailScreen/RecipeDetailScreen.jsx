/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Alert, ActivityIndicator, Text } from 'react-native';
import RecipeDetailHeader from '../../components/RecipeDetailHeader/RecipeDetailHeader';
import GenerateShoppingListButton from '../../components/GenerateShoppingListButton/GenerateShoppingListButton';
import TabButton from '../../components/TabButton/TabButton';
import CookwareSection from '../../components/CookwareSection/CookwareSection';
import IngredientsSection from '../../components/IngredientsSection/IngredientsSection';
import InstructionsSection from '../../components/InstructionsSection/InstructionsSection';
import styles from './RecipeDetailScreenStyles';
import RecipeServices from '../../services/RecipeServices'; // Importez le service de recettes

const RecipeDetailScreen = ({ route, navigation }) => {
  const { recipeId } = route.params;
  const [currentRecipeDetails, setCurrentRecipeDetails] = useState(null);
  const [currentServings, setCurrentServings] = useState(1); // État pour les portions
  const [activeTab, setActiveTab] = useState('Cookware');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const recipe = await RecipeServices.getRecipeById(recipeId);
        if (recipe) {
          setCurrentRecipeDetails(recipe);
          setCurrentServings(recipe.servings); // Initialise avec les portions de la recette
        } else {
          setError('Recette introuvable.');
        }
      } catch (err) {
        console.error('Erreur lors du chargement de la recette :', err);
        setError('Impossible de charger la recette. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleIncreaseServings = () => {
    if (currentRecipeDetails) {
      setCurrentServings(prev => prev + 1);
    }
  };

  const handleDecreaseServings = () => {
    if (currentRecipeDetails && currentServings > 1) {
      setCurrentServings(prev => prev - 1);
    }
  };

  const handleGenerateShoppingList = () => {
    if (currentRecipeDetails) {
      Alert.alert(
        'Générer la liste de courses',
        `Vous allez générer une liste de courses pour "${currentRecipeDetails.nom}" pour ${currentServings} portions.`,
        [{ text: 'OK' }]
      );
    }
  };

  const renderContent = () => {
    if (!currentRecipeDetails) {return null;}

    // Calculs ajustés pour les propriétés du modèle Recette
    const adjustedCookware = currentRecipeDetails.utensils.map(item => ({
      ...item,
      quantity: item.quantity, // Utilise la propriété 'quantite' du modèle Ustensile
    }));

    const adjustedIngredients = currentRecipeDetails.ingredients.map(item => ({
      ...item,
      quantity:
        currentRecipeDetails.servings > 0
          ? (item.quantity / currentRecipeDetails.servings) * currentServings
          : item.quantity,
      unitOfMeasure: item.unitOfMeasure,
      unitCost: item.unitCost,
    }));

    switch (activeTab) {
      case 'Cookware':
        return <CookwareSection cookwareList={adjustedCookware} />;
      case 'Ingredients':
        return <IngredientsSection ingredients={adjustedIngredients} />;
      case 'Instructions':
        return <InstructionsSection instructionsList={currentRecipeDetails.instructions} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#f3c09e" />
        <Text style={{ marginTop: 10 }}>Chargement de la recette...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
      </View>
    );
  }

  if (!currentRecipeDetails) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Aucune recette disponible.</Text>
      </View>
    );
  }

  // Calcul du temps et du coût pour l'affichage dans le header
  const timeInHours = Math.floor(currentRecipeDetails.preparationTimeMinutes / 60);
  const timeInMinutes = currentRecipeDetails.preparationTimeMinutes % 60;
  const formattedTime = (timeInHours > 0 ? `${timeInHours}h ` : '') + (timeInMinutes > 0 ? `${timeInMinutes}min` : '');

  // Le prix doit être recalculé si les portions changent, en fonction du coût unitaire des ingrédients
  // Le calcul de calculerCoutPreparation() est déjà dynamique dans le modèle Recette
  const displayPrice = `${currentRecipeDetails.calculateTotalCost().toFixed(2)} XCFA`;


  return (
    <ScrollView style={styles.container}>
      <RecipeDetailHeader
        image={currentRecipeDetails.imageUrl ? { uri: currentRecipeDetails.imageUrl } : require('../../../assets/images/meal-1.png')}
        title={currentRecipeDetails.title}
        rating={currentRecipeDetails.rating}
        time={formattedTime}
        price={displayPrice}
        onGoBack={() => navigation.goBack()}
        onShare={() => console.log('Share Recipe')}
        currentServings={currentServings}
        onServingsIncrease={handleIncreaseServings}
        onServingsDecrease={handleDecreaseServings}
      />

      <View style={styles.tabsContainer}>
        <TabButton
          title="Ustensiles"
          isActive={activeTab === 'Cookware'}
          onPress={() => setActiveTab('Cookware')}
        />
        <TabButton
          title="Ingrédients"
          isActive={activeTab === 'Ingredients'}
          onPress={() => setActiveTab('Ingredients')}
        />
        <TabButton
          title="Instructions"
          isActive={activeTab === 'Instructions'}
          onPress={() => setActiveTab('Instructions')}
        />
      </View>

      <View style={styles.tabContentArea}>
        {renderContent()}
      </View>

      <View style={styles.generateListButtonContainer}>
        <GenerateShoppingListButton onPress={handleGenerateShoppingList} />
      </View>
    </ScrollView>
  );
};

export default RecipeDetailScreen;

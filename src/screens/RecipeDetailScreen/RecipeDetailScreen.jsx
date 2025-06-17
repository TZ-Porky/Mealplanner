import React, { useState, useEffect } from 'react';
import { ScrollView, View, Alert, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import RecipeDetailHeader from '../../components/RecipeDetailHeader/RecipeDetailHeader';
import GenerateShoppingListButton from '../../components/GenerateShoppingListButton/GenerateShoppingListButton';
import TabButton from '../../components/TabButton/TabButton';
import CookwareSection from '../../components/CookwareSection/CookwareSection';
import IngredientsSection from '../../components/IngredientsSection/IngredientsSection';
import InstructionsSection from '../../components/InstructionsSection/InstructionsSection';
import styles from './RecipeDetailScreenStyles';
import axios from 'axios'; // Pour l'IA

const detailedRecipeData = {
  id: 'welsh-rabbit',
  image: require('../../../assets/images/meal-1.png'),
  title: 'Welsh Rabbit (Homemade)',
  rating: 5,
  time: '1 hour 30 Minutes',
  servings: 6,
  price: '7,500 XCFA',
  cookware: [
    { id: 'cw1', name: 'Saucepan', quantity: 1, price: 3000 },
    { id: 'cw2', name: 'Stockpot', quantity: 1, price: 7000 },
    { id: 'cw3', name: 'Pot', quantity: 1, price: 6000 },
    { id: 'cw4', name: 'Spoon', quantity: 2, price: 300 },
    { id: 'cw5', name: 'Plate', quantity: 2, price: 500 },
  ],
  baseIngredients: [
    { id: 'ing1', name: 'Ingredient Name 1', quantity: 0.5, unit: 'cup' },
    { id: 'ing2', name: 'Ingredient Name 2', quantity: 1.0, unit: 'tablespoon' },
    { id: 'ing3', name: 'Ingredient Name 3', quantity: 200, unit: 'g' },
    { id: 'ing4', name: 'Ingredient Name 4', quantity: 3, unit: 'pieces' },
    { id: 'ing5', name: 'Ingredient Name 5', quantity: 0.25, unit: 'cup' },
    { id: 'ing6', name: 'Ingredient Name 6', quantity: 50, unit: 'ml' },
  ],
  estimatedIngredientsTotal: 7500,
  instructions: [
    { id: 'ins1', stepNumber: 1, time: '15 Minutes', description: 'Boil chicken until it falls apart, then shred.' },
    { id: 'ins2', stepNumber: 2, time: '30 Minutes', description: 'Put 1/2 can on bottom of 11x9 baking dish.' },
    { id: 'ins3', stepNumber: 3, time: '1h15 Minutes', description: 'Microwave tortillas until soft.' },
  ],
};

const mockStock = {
  'Ingredient Name 1': 0.2,
  'Ingredient Name 2': 0.5,
  'Ingredient Name 3': 100,
  'Ingredient Name 4': 1,
  'Ingredient Name 5': 0.0,
  'Ingredient Name 6': 20,
};

const RecipeDetailScreen = ({ navigation, route }) => {
  const { recipe } = route.params;

  const currentRecipeDetails = detailedRecipeData.id === recipe.id ? detailedRecipeData : {
    ...recipe,
    cookware: [], ingredients: [], instructions: [],
    servings: parseInt(recipe.servings || '1', 10),
    baseIngredients: [], estimatedIngredientsTotal: 0,
  };

  const initialServings = parseInt(recipe.servings, 10) || detailedRecipeData.servings;
  const [currentServings, setCurrentServings] = useState(initialServings);
  const [scaledIngredients, setScaledIngredients] = useState([]);
  const [activeTab, setActiveTab] = useState('Cookware');

  const [iaResponse, setIaResponse] = useState('');
  const [loadingIA, setLoadingIA] = useState(false);

  const scaleIngredients = (servings) => {
    const scaleFactor = servings / currentRecipeDetails.servings;
    return currentRecipeDetails.baseIngredients.map(ing => {
      const scaledQuantity = ing.quantity * scaleFactor;
      return {
        ...ing,
        quantity: scaledQuantity,
        displayQuantity: scaledQuantity.toFixed(1),
      };
    });
  };

  useEffect(() => {
    setScaledIngredients(scaleIngredients(currentServings));
  }, [currentServings, currentRecipeDetails.id]);

  useEffect(() => {
    setScaledIngredients(scaleIngredients(initialServings));
  }, [initialServings, currentRecipeDetails.id]);

  const handleIncreaseServings = () => setCurrentServings(prev => prev + 1);
  const handleDecreaseServings = () => setCurrentServings(prev => Math.max(1, prev - 1));

 const handleGenerateShoppingList = () => {
   let shoppingListItems = [];

   scaledIngredients.forEach((ingredient) => {
     const required = ingredient.quantity;
     const inStock = mockStock[ingredient.name] || 0;

     if (required > inStock) {
       const needed = required - inStock;
       const unit = ingredient.unit ? ingredient.unit : '';
       const item = `${needed.toFixed(1)} ${unit} ${ingredient.name}`;
       shoppingListItems.push(item);
     }
   });

   if (shoppingListItems.length > 0) {
     Alert.alert(
       'Shopping List',
       'You need to buy:\n\n' + shoppingListItems.join('\n'),
       [{ text: 'OK' }]
     );
   } else {
     Alert.alert('Shopping List', 'You have all the ingredients in stock!', [{ text: 'OK' }]);
   }
 };

  const handleAIExplain = async () => {
    setLoadingIA(true);
    setIaResponse('');
    try {
        const recipeTitle = currentRecipeDetails.name || 'ce plat';
        const recipeTime = currentRecipeDetails.time || 'un certain temps';
        const ingredientList = scaledIngredients.map(ing => ing.name).join(', ') || 'des ingrédients inconnus';

      const prompt = `Explique simplement le plat "${recipeTitle}". Il contient ${ingredientList} et prend ${recipeTime} à cuisiner.`;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Remplace ici ta vraie clé
            'Content-Type': 'application/json',
          },
        }
      );


      setIaResponse(response.data.choices[0].message.content);
    } catch (err) {
      console.error(err);
      setIaResponse("Erreur lors de la requête à l’IA.");
    } finally {
      setLoadingIA(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Cookware':
        return <CookwareSection cookwareList={detailedRecipeData.cookware} />;
      case 'Ingredients':
        return <IngredientsSection ingredientsList={scaledIngredients} estimatedTotal={detailedRecipeData.estimatedIngredientsTotal} />;
      case 'Instructions':
        return <InstructionsSection instructionsList={detailedRecipeData.instructions} />;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <RecipeDetailHeader
        imageSource={currentRecipeDetails.image}
        title={currentRecipeDetails.name}
        rating={currentRecipeDetails.rating}
        time={currentRecipeDetails.time}
        price={currentRecipeDetails.price}
        onGoBack={() => navigation.goBack()}
        onShare={() => console.log('Share Recipe')}
        currentServings={currentServings}
        onServingsIncrease={handleIncreaseServings}
        onServingsDecrease={handleDecreaseServings}
      />

      <View style={styles.tabsContainer}>
        <TabButton title="Cookware" isActive={activeTab === 'Cookware'} onPress={() => setActiveTab('Cookware')} />
        <TabButton title="Ingredients" isActive={activeTab === 'Ingredients'} onPress={() => setActiveTab('Ingredients')} />
        <TabButton title="Instructions" isActive={activeTab === 'Instructions'} onPress={() => setActiveTab('Instructions')} />
      </View>

      <TouchableOpacity onPress={handleAIExplain} style={{ backgroundColor: '#F57C00', padding: 12, borderRadius: 8, marginHorizontal: 20, marginTop: 10 }}>
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Demander à l’IA d’expliquer ce plat</Text>
      </TouchableOpacity>

      {loadingIA && <ActivityIndicator style={{ marginTop: 10 }} color="#F57C00" />}
      {iaResponse !== '' && (
        <View style={{ margin: 15, backgroundColor: '#f4f4f4', padding: 12, borderRadius: 8 }}>
          <Text style={{ color: '#333' }}>{iaResponse}</Text>
        </View>
      )}

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
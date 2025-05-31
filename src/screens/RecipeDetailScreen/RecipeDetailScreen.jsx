import React, { useState, useEffect } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import RecipeDetailHeader from '../../components/RecipeDetailHeader/RecipeDetailHeader';
import GenerateShoppingListButton from '../../components/GenerateShoppingListButton/GenerateShoppingListButton'; // Renamed from GeneralShoppingListButton
import TabButton from '../../components/TabButton/TabButton';
import CookwareSection from '../../components/CookwareSection/CookwareSection';
import IngredientsSection from '../../components/IngredientsSection/IngredientsSection';
import InstructionsSection from '../../components/InstructionsSection/InstructionsSection';
import styles from './RecipeDetailScreenStyles';

// --- IMPORTANT: Redéfinition des données de la recette avec des quantités numériques ---
// Cette `baseRecipeData` devrait être votre source de vérité pour une recette complète,
// que vous récupéreriez normalement d'une API en utilisant `recipe.id` de `route.params`.
// Pour l'exemple, nous la définissons ici.
const detailedRecipeData = {
  id: 'welsh-rabbit',
  image: require('../../../assets/images/meal-1.png'), // Change if your actual image path is different
  title: 'Welsh Rabbit (Homemade)',
  rating: 5,
  time: '1 hour 30 Minutes',
  servings: 6, // Numérique pour les calculs de parts
  price: '7,500 XCFA',
  cookware: [
    { id: 'cw1', name: 'Saucepan', quantity: 1, price: 3000 },
    { id: 'cw2', name: 'Stockpot', quantity: 1, price: 7000 },
    { id: 'cw3', name: 'Pot', quantity: 1, price: 6000 },
    { id: 'cw4', name: 'Spoon', quantity: 2, price: 300 },
    { id: 'cw5', name: 'Plate', quantity: 2, price: 500 },
  ],
  // Définissez les ingrédients avec des quantités numériques et des unités pour le calcul
  baseIngredients: [
    { id: 'ing1', name: 'Ingredient Name 1', quantity: 0.5, unit: 'cup' },
    { id: 'ing2', name: 'Ingredient Name 2', quantity: 1.0, unit: 'tablespoon' },
    { id: 'ing3', name: 'Ingredient Name 3', quantity: 200, unit: 'g' },
    { id: 'ing4', name: 'Ingredient Name 4', quantity: 3, unit: 'pieces' },
    { id: 'ing5', name: 'Ingredient Name 5', quantity: 0.25, unit: 'cup' },
    { id: 'ing6', name: 'Ingredient Name 6', quantity: 50, unit: 'ml' },
  ],
  estimatedIngredientsTotal: 7500, // Total affiché sur l'image pour les ingrédients
  instructions: [
    { id: 'ins1', stepNumber: 1, time: '15 Minutes', description: 'Boil chicken until it falls apart, then shred. Mix 1/2 cup of sauce and a little cheese with chicken.' },
    { id: 'ins2', stepNumber: 2, time: '30 Minutes', description: 'Put other 1/2 can on bottom of 11x9 baking dish. Microwave tortillas until soft.' },
    { id: 'ins3', stepNumber: 3, time: '1h15 Minutes', description: 'Put other 1/2 can on bottom of 11x9 baking dish. Microwave tortillas until soft.' },
  ],
};

// SIMULATION DE STOCK (pour le bouton de liste de courses)
// Les unités doivent correspondre aux unités des ingrédients
const mockStock = {
    'Ingredient Name 1': 0.2, // en cups
    'Ingredient Name 2': 0.5, // en tablespoons
    'Ingredient Name 3': 100, // en g
    'Ingredient Name 4': 1,   // en pieces
    'Ingredient Name 5': 0.0, // en cups
    'Ingredient Name 6': 20,  // en ml
};

const RecipeDetailScreen = ({ navigation, route }) => {
  // Utilisez les données passées par la navigation comme base,
  // et combinez-les avec les détails complets (cookware, baseIngredients, instructions)
  // qui seraient normalement récupérés via un ID
  const { recipe } = route.params; // `recipe` contient id, image, name, rating, time, price, tags

  // Initialisez les parts avec la valeur passée ou la valeur par défaut du détaillé
  const initialServings = parseInt(recipe.servings, 10) || detailedRecipeData.servings;
  const [currentServings, setCurrentServings] = useState(initialServings);
  const [scaledIngredients, setScaledIngredients] = useState([]);
  const [activeTab, setActiveTab] = useState('Cookware');

  // Fonction pour mettre à l'échelle les ingrédients
  const scaleIngredients = (servings) => {
    // Utilisez les `baseIngredients` de `detailedRecipeData`
    const scaleFactor = servings / detailedRecipeData.servings;
    return detailedRecipeData.baseIngredients.map(ing => {
      // Pour l'affichage, on peut arrondir ou formater
      const scaledQuantity = ing.quantity * scaleFactor;
      return {
        ...ing,
        quantity: scaledQuantity, // Garder le nombre pour le calcul du shopping list
        displayQuantity: scaledQuantity.toFixed(1), // Pour l'affichage
      };
    });
  };

  useEffect(() => {
    // Mettre à jour les ingrédients mis à l'échelle lorsque les parts changent
    setScaledIngredients(scaleIngredients(currentServings));
  }, [currentServings]); // Se déclenche quand currentServings change

  // Initialiser les ingrédients lors du premier rendu de l'écran
  useEffect(() => {
    setScaledIngredients(scaleIngredients(initialServings));
  }, [initialServings]); // Se déclenche une seule fois au montage du composant


  const handleIncreaseServings = () => {
    setCurrentServings(prevServings => prevServings + 1);
  };

  const handleDecreaseServings = () => {
    setCurrentServings(prevServings => Math.max(1, prevServings - 1)); // Minimum 1 part
  };

  const handleGenerateShoppingList = () => {
    let shoppingListItems = [];
    scaledIngredients.forEach(ingredient => {
      const required = ingredient.quantity; // Utiliser la quantité numérique
      const inStock = mockStock[ingredient.name] || 0;

      if (required > inStock) {
        const needed = required - inStock;
        // Formatage pour l'affichage de la liste
        shoppingListItems.push(`${needed.toFixed(1)} ${ingredient.unit || ''} ${ingredient.name}`);
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

  // Le `fullRecipeData` est maintenant une combinaison de `recipe` et `detailedRecipeData`
  // Surtout pour les champs que `recipe` de la navigation ne contient pas
  const displayRecipe = {
    ...detailedRecipeData, // Détails complets comme cookware, instructions
    ...recipe, // Écrase les champs communs avec ceux passés par la navigation (image, title, rating, etc.)
    // Assurez-vous que `servings` est un nombre ici pour `RecipeDetailHeader`
    servings: currentServings, // On utilise l'état local des parts
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
    // Le ScrollView doit envelopper tout le contenu défilable, y compris l'en-tête, les onglets et le contenu des onglets.
    // Le style `flex: 1` sur le ScrollView lui permet de prendre toute la hauteur disponible.
    // Le `contentContainerStyle` permet le défilement si le contenu dépasse la hauteur.
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
       <RecipeDetailHeader
        imageSource={displayRecipe.image}
        title={displayRecipe.title}
        rating={displayRecipe.rating}
        time={displayRecipe.time}
        // servings={displayRecipe.servings} // Ne pas passer `servings` ici si le ServingsSelector est interne
        price={displayRecipe.price}
        onGoBack={() => navigation.goBack()}
        onShare={() => console.log('Share Recipe')}
        currentServings={currentServings} // Passe l'état des parts au sélecteur
        onServingsIncrease={handleIncreaseServings}
        onServingsDecrease={handleDecreaseServings}
      />

      <View style={styles.tabsContainer}>
        <TabButton
          title="Cookware"
          isActive={activeTab === 'Cookware'}
          onPress={() => setActiveTab('Cookware')}
        />
        <TabButton
          title="Ingredients"
          isActive={activeTab === 'Ingredients'}
          onPress={() => setActiveTab('Ingredients')}
        />
        <TabButton
          title="Instructions"
          isActive={activeTab === 'Instructions'}
          onPress={() => setActiveTab('Instructions')}
        />
      </View>

      {/* Le contenu des onglets doit être directement rendu ici pour éviter un ScrollView imbriqué inutile */}
      <View style={styles.tabContentArea}>
        {renderContent()}
      </View>

      {/* Nouveau bouton de liste de courses en bas du ScrollView */}
      <View style={styles.generateListButtonContainer}>
          <GenerateShoppingListButton onPress={handleGenerateShoppingList} />
      </View>
    </ScrollView>
  );
};

export default RecipeDetailScreen;

/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {ScrollView, View, Alert, ActivityIndicator, Text} from 'react-native';
import RecipeDetailHeader from '../../components/RecipeDetailHeader/RecipeDetailHeader';
import GenerateShoppingListButton from '../../components/GenerateShoppingListButton/GenerateShoppingListButton';
import TabButton from '../../components/TabButton/TabButton';
import CookwareSection from '../../components/CookwareSection/CookwareSection';
import IngredientsSection from '../../components/IngredientsSection/IngredientsSection';
import InstructionsSection from '../../components/InstructionsSection/InstructionsSection';
import styles from './RecipeDetailScreenStyles';
import RecipeServices from '../../services/RecipeServices';
import AuthServices from '../../services/AuthServices';
import ShoppingListServices from '../../services/ShoppingListServices';
import ShoppingList from '../../models/ListeCourse';
import ShoppingListItem from '../../models/ElementListeCourse';

const RecipeDetailScreen = ({route, navigation}) => {
  const {recipeId} = route.params;
  const [currentRecipeDetails, setCurrentRecipeDetails] = useState(null);
  const [currentServings, setCurrentServings] = useState(1);
  const [activeTab, setActiveTab] = useState('Cookware');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canBeEdited, setCanBeEdited] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const recipe = await RecipeServices.getRecipeById(recipeId);
        if (recipe) {
          setCurrentRecipeDetails(recipe);
          setCurrentServings(recipe.servings);
          const currentUser = await AuthServices.getCurrentUser();
          setCanBeEdited(currentUser?.uid && recipe.userId === currentUser.uid);
        } else {
          setError('Recette introuvable.');
        }
      } catch (errorFetchRecipe) {
        console.error(
          'Erreur lors de la récupération de la recette:',
          errorFetchRecipe,
        );
        Alert.alert('Erreur', 'Impossible de charger la recette.');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();

    // Écoute des changements de recettes
    const unsubscribe = RecipeServices.onRecipesChanged(updatedRecipes => {
      fetchRecipe();
    });

    // Nettoyage de l'écouteur lors du démontage du composant
    return () => unsubscribe();
  }, [navigation, recipeId]);

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

  const handleGenerateShoppingList = async () => {
    if (!currentRecipeDetails) {return;}

    try {
      const user = await AuthServices.getCurrentUser();

      const ingredients = currentRecipeDetails.ingredients.map(item => ({
        name: item.name,
        quantity:
          (item.quantity / currentRecipeDetails.servings) * currentServings,
        unitOfMeasure: item.unitOfMeasure,
        category: item.category || '',
        itemType: 'Ingrédient',
        isPurchased: false,
        price: parseFloat(item.unitCost || 0),
      }));

      const utensils = currentRecipeDetails.utensils.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unitOfMeasure: '',
        category: '',
        itemType: 'Ustensile',
        isPurchased: false,
        price: 0,
      }));

      const allItems = [...ingredients, ...utensils].map(
        item =>
          new ShoppingListItem(
            item.name,
            item.quantity,
            item.unitOfMeasure,
            item.category,
            item.itemType,
            item.isPurchased,
            item.price,
          ),
      );

      const list = new ShoppingList(
        null,
        user.uid,
        `Liste pour ${currentRecipeDetails.title}`,
        currentRecipeDetails.title,
        allItems,
      );

      await ShoppingListServices.createShoppingList(list);

      Alert.alert('Succès', 'Liste de courses générée avec succès.');
      navigation.navigate('Courses');
    } catch (errorMessage) {
      console.error('Erreur lors de la génération de la liste :', errorMessage);
      Alert.alert('Erreur', 'Impossible de générer la liste de courses.');
    }
  };

  const renderContent = () => {
    if (!currentRecipeDetails) {
      return null;
    }

    const adjustedCookware = currentRecipeDetails.utensils.map(item => ({
      ...item,
      quantity: item.quantity,
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
        return (
          <InstructionsSection
            instructionsList={currentRecipeDetails.instructions}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <ActivityIndicator size="large" color="#f3c09e" />
        <Text style={{marginTop: 10}}>Chargement de la recette...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
      </View>
    );
  }

  if (!currentRecipeDetails) {
    return (
      <View
        style={[
          styles.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text>Aucune recette disponible.</Text>
      </View>
    );
  }

  const handleEditRecipe = () => {
    if (currentRecipeDetails && canBeEdited) {
      navigation.navigate('EditMeal', {recipe: currentRecipeDetails});
    }
  };

  const handleDeleteRecipe = () => {
    Alert.alert(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer cette recette ? Cette action est irréversible.',
      [
        {text: 'Annuler', style: 'cancel'},
        {text: 'Supprimer', style: 'destructive', onPress: deleteRecipe},
      ],
    );
  };

  const deleteRecipe = async () => {
    try {
      RecipeServices.deleteRecipe(currentRecipeDetails.id);
      navigation.goBack();
      Alert.alert('Confirmation', 'Votre recette a été supprimée avec succès.');
    } catch (deleteError) {
      console.error(
        'Erreur lors de la suppression de la recette :',
        deleteError,
      );
      Alert.alert(
        'Erreur',
        'Impossible de supprimer la recette. Veuillez réessayer plus tard.',
      );
    }
  };

  // Calcul du temps et du coût pour l'affichage dans le header
  const timeInHours = Math.floor(
    currentRecipeDetails.preparationTimeMinutes / 60,
  );
  const timeInMinutes = currentRecipeDetails.preparationTimeMinutes % 60;
  const formattedTime =
    (timeInHours > 0 ? `${timeInHours}h ` : '') +
    (timeInMinutes > 0 ? `${timeInMinutes}min` : '');

  // Calcul du prix total pour l'affichage dans le header
  const displayPrice = `${currentRecipeDetails
    .calculateTotalCost()
    .toFixed(2)} XCFA`;

  return (
    <ScrollView style={styles.container}>
      <RecipeDetailHeader
        image={currentRecipeDetails.imageUrl}
        title={currentRecipeDetails.title}
        rating={currentRecipeDetails.rating}
        time={formattedTime}
        price={displayPrice}
        onGoBack={() => navigation.goBack()}
        onShare={() => console.log('Share Recipe')}
        onDelete={handleDeleteRecipe}
        onEdit={handleEditRecipe}
        canBeEdited={canBeEdited}
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

      <View style={styles.tabContentArea}>{renderContent()}</View>

      <View style={styles.generateListButtonContainer}>
        <GenerateShoppingListButton onPress={handleGenerateShoppingList} />
      </View>
    </ScrollView>
  );
};

export default RecipeDetailScreen;

import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, Alert } from 'react-native'; // Ajout de FlatList pour les performances
import MarketHeader from '../../components/MarketHeader/MarketHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterButtons from '../../components/FilterButtons/FilterButtons';
import MealCard from '../../components/MealCard/MealCard'; // Votre nouvelle MealCard
import AddMealButton from '../../components/AddMealButton/AddMealButton';
import styles from './MarketScreenStyles';
import { GlobalStyles } from '../../styles/AppStyles';

const DUMMY_MEALS = [
  {
    id: 'meal1',
    name: 'Meal Name',
    image: require('../../../assets/images/meal-1.png'), // Assurez-vous d'avoir cette image
    ingredientsDesc: 'Ingredients', // Description courte pour la carte
    time: '30 Min',
    price: '2,500 XCFA',
    rating: 5,
    tag: 'Easy',
    // Ajoutez ici des détails complets pour la navigation vers RecipeDetailScreen si nécessaire
    // comme les vrais ingrédients, instructions, etc.
  },
  {
    id: 'meal2',
    name: 'Spicy Chicken Curry',
    image: require('../../../assets/images/meal-1.png'), // Utilisez la même image pour l'exemple
    ingredientsDesc: 'Chicken, Spices, Coconut Milk',
    time: '45 Min',
    price: '3,500 XCFA',
    rating: 4.5,
    tag: 'Medium',
  },
  {
    id: 'meal3',
    name: 'Vegetarian Lasagna',
    image: require('../../../assets/images/meal-1.png'), // Utilisez la même image pour l'exemple
    ingredientsDesc: 'Pasta, Vegetables, Cheese',
    time: '1 hour',
    price: '4,000 XCFA',
    rating: 4,
    tag: 'Hard',
  },
  {
    id: 'meal4',
    name: 'Salmon with Asparagus',
    image: require('../../../assets/images/meal-1.png'),
    ingredientsDesc: 'Salmon, Asparagus, Lemon',
    time: '25 Min',
    price: '5,000 XCFA',
    rating: 5,
    tag: 'Easy',
  },
  // Ajoutez d'autres repas si vous le souhaitez
];

const filters = ['ALL', '5 Stars', 'Easy', 'Recent'];

const MarketScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');

  const handleSearch = () => {
    Alert.alert('Search', `Searching for: ${searchQuery}`);
    // Ici, vous implémenteriez la logique de filtrage ou d'appel API
  };

  const handleFilterSelect = (filter) => {
    setActiveFilter(filter);
    // Ici, vous implémenteriez la logique de filtrage des repas affichés
  };

  const filteredMeals = DUMMY_MEALS.filter(meal => {
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          meal.ingredientsDesc.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = activeFilter === 'ALL' ||
                          (activeFilter === '5 Stars' && meal.rating === 5) ||
                          (activeFilter === 'Easy' && meal.tag === 'Easy');
                          // Ajoutez d'autres conditions pour 'Recent' si vous avez une propriété 'date' ou 'added'

    return matchesSearch && matchesFilter;
  });

  const handleMealPress = (meal) => {
    // Naviguez vers l'écran de détail de la recette en passant l'objet de repas complet
    // Assurez-vous que votre AppNavigator a un écran nommé 'RecipeDetail'
    navigation.navigate('RecipeDetail', { recipe: meal });
  };

  const handleAddMeal = () => {
    Alert.alert('Add Meal', 'Navigate to add new meal screen or open a form.');
    // Ici, vous navigueriez vers un écran d'ajout de nouvelle recette
  };

  return (
    <ScrollView style={GlobalStyles.container}>
      {/* Header */}
      <MarketHeader
        onMenuPress={() => navigation.openDrawer()} // Supposons un Drawer Navigator
        onNotificationsPress={() => Alert.alert('Notifications', 'Notifications pressed')}
        onCartPress={() => Alert.alert('Cart', 'Cart pressed')}
      />

      {/* Browse Meal Section */}
      <View style={styles.greetingSection}>
        <Text style={styles.browseTitle}>
          Browse <Text style={styles.browseMealHighlight}>Meal</Text>
        </Text>
        <Text style={styles.browseSubtitle}>Explore and log curated meal from us</Text>
      </View>

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
      />

      {/* Filter Buttons */}
      <FilterButtons
        filters={filters}
        activeFilter={activeFilter}
        onSelectFilter={handleFilterSelect}
      />

      {/* List of Meals */}
      {/* Utilisation de FlatList pour un rendu optimisé des listes */}
      <FlatList
        data={filteredMeals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MealCard meal={item} onPress={handleMealPress} />}
        contentContainerStyle={{ paddingBottom: 30 }} // Espace pour le bouton flottant
      />

      {/* Add Meal Button (fixed at the bottom) */}
      <AddMealButton onPress={handleAddMeal} />
    </ScrollView>
  );
};

export default MarketScreen;

/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, ActivityIndicator } from 'react-native';
import MarketHeader from '../../components/MarketHeader/MarketHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterButtons from '../../components/FilterButtons/FilterButtons';
import MealCard from '../../components/MealCard/MealCard';
import styles from './MarketScreenStyles';
import { GlobalStyles } from '../../styles/AppStyles';
import RecipeServices from '../../services/RecipeServices';

const MarketScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const filters = ['All', 'Sweet', 'Salty', 'Vegetarian', 'Vegan', 'Dessert', 'Breakfast'];

  useEffect(() => {
    // Charger les recettes au montage du composant
    const unsubscribe = RecipeServices.onRecipesChanged((fetchedRecipes) => {
      setRecipes(fetchedRecipes);
      setLoading(false);
    }, null); // Passe null pour récupérer toutes les recettes, ou auth.currentUser.uid pour celles de l'utilisateur

    // Nettoyage de l'écouteur lors du démontage du composant
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Appliquer les filtres et la recherche
    let currentFiltered = recipes;

    if (activeFilter !== 'All') {
      currentFiltered = currentFiltered.filter(recipe => recipe.categorie === activeFilter);
    }

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      currentFiltered = currentFiltered.filter(
        recipe =>
          recipe.titre.toLowerCase().includes(lowerCaseQuery) ||
          recipe.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
      );
    }
    setFilteredRecipes(currentFiltered);
  }, [recipes, activeFilter, searchQuery]);

  const handleSearch = () => {
    // La recherche est déjà appliquée via useEffect lorsque searchQuery change
    console.log('Searching for:', searchQuery);
  };

  const handleFilterSelect = (filter) => {
    setActiveFilter(filter);
  };

  const handleMealPress = (meal) => {
    // Naviguer vers un écran de détails de recette
    navigation.navigate('RecipeDetail', { recipeId: meal.id });
  };

  const handleAddMeal = () => {
    navigation.navigate('AddMeal');
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const ListHeader = () => (
    <View>
      <MarketHeader
        onNotificationsPress={() => Alert.alert('Notifications', 'Notifications pressed')}
        onCartPress={() => Alert.alert('Cart', 'Cart pressed')}
        onAddPress={handleAddMeal}
      />
      <View style={styles.greetingSection}>
        <Text style={styles.browseTitle}>
          Browse <Text style={styles.browseMealHighlight}>Meal</Text>
        </Text>
        <Text style={styles.browseSubtitle}>
          Explore and log curated meal from us
        </Text>
      </View>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
      />
      <FilterButtons
        filters={filters}
        activeFilter={activeFilter}
        onSelectFilter={handleFilterSelect}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#f3c09e" />
        <Text style={{ marginTop: 10 }}>Chargement des recettes...</Text>
      </View>
    );
  }

  return (
    <View style={GlobalStyles.container}>
      <FlatList
        data={filteredRecipes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MealCard meal={item} onPress={() => handleMealPress(item)} />
        )}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.flatListContentContainer}
        showsVerticalScrollIndicator={false}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: '30%' }}>
            <Text style={{ fontSize: 16, color: '#888', textAlign: 'center'}}>
              No recipes found. Try adjusting your filters or search query.
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default MarketScreen;

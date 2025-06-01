import React, { useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native'; // On garde FlatList, pas de ScrollView ici
import MarketHeader from '../../components/MarketHeader/MarketHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterButtons from '../../components/FilterButtons/FilterButtons';
import MealCard from '../../components/MealCard/MealCard';
import AddMealButton from '../../components/AddMealButton/AddMealButton'; // On garde le composant du bouton
import styles from './MarketScreenStyles';
import { GlobalStyles } from '../../styles/AppStyles'; // Vérifiez toujours ce chemin

const DUMMY_MEALS = [
  // ... (vos données DUMMY_MEALS restent inchangées)
  {
    id: 'welsh-rabbit',
    name: 'Welsh Rabbit (Homemade)',
    image: require('../../../assets/images/meal-1.png'),
    ingredientsDesc: 'Classic cheese toast',
    time: '1 hour 30 Minutes',
    price: '7,500 XCFA',
    rating: 5,
    tag: 'Easy',
    servings: '6',
  },
  {
    id: 'meal2',
    name: 'Spicy Chicken Curry',
    image: require('../../../assets/images/meal-1.png'),
    ingredientsDesc: 'Chicken, Spices, Coconut Milk',
    time: '45 Min',
    price: '3,500 XCFA',
    rating: 4.5,
    tag: 'Medium',
    servings: '4',
  },
  {
    id: 'meal3',
    name: 'Vegetarian Lasagna',
    image: require('../../../assets/images/meal-1.png'),
    ingredientsDesc: 'Pasta, Vegetables, Cheese',
    time: '1 hour',
    price: '4,000 XCFA',
    rating: 4,
    tag: 'Hard',
    servings: '8',
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
    servings: '2',
  },
];

const filters = ['ALL', '5 Stars', 'Easy', 'Recent'];

const MarketScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');

  const handleSearch = () => {
    Alert.alert('Search', `Searching for: ${searchQuery}`);
  };

  const handleFilterSelect = filter => {
    setActiveFilter(filter);
  };

  const filteredMeals = DUMMY_MEALS.filter(meal => {
    const matchesSearch =
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.ingredientsDesc.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === 'ALL' ||
      (activeFilter === '5 Stars' && meal.rating === 5) ||
      (activeFilter === 'Easy' && meal.tag === 'Easy');

    return matchesSearch && matchesFilter;
  });

  const handleMealPress = meal => {
    navigation.navigate('RecipeDetail', { recipe: meal });
  };

  const handleAddMeal = () => {
    Alert.alert('Add Meal', 'Navigate to add new meal screen or open a form.');
    // Ici, vous navigueriez vers un écran d'ajout de nouvelle recette
  };

  // Composant d'en-tête de la liste pour la FlatList
  const ListHeader = () => (
    <View>
      <MarketHeader
        onMenuPress={() => navigation.openDrawer && navigation.openDrawer()}
        onNotificationsPress={() => Alert.alert('Notifications', 'Notifications pressed')}
        onCartPress={() => Alert.alert('Cart', 'Cart pressed')}
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

  // Composant de pied de page pour la FlatList (contiendra le bouton "Add Meal")
  const ListFooter = () => (
    <View style={styles.footerButtonContainer}>
      <AddMealButton onPress={handleAddMeal} />
    </View>
  );

  return (
    <View style={GlobalStyles.container}>
      <FlatList
        data={filteredMeals}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <MealCard meal={item} onPress={handleMealPress} />
        )}
        ListHeaderComponent={ListHeader} // L'en-tête de la liste
        ListFooterComponent={ListFooter} // Le pied de page de la liste (avec le bouton)
        contentContainerStyle={styles.flatListContentContainer} // Gère l'espacement
      />
    </View>
  );
};

export default MarketScreen;

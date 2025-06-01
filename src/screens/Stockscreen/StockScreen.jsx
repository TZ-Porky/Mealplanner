import React, { useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import MarketHeader from '../../components/MarketHeader/MarketHeader'; // Réutilisation
import SearchBar from '../../components/SearchBar/SearchBar'; // Réutilisation
import FilterButtons from '../../components/FilterButtons/FilterButtons'; // Réutilisation
import IngredientCard from '../../components/IngredientCard/IngredientCard'; // Nouveau
import AddIngredientButton from '../../components/AddIngredientButton/AddIngredientButton'; // Nouveau
import styles from './StockScreenStyles';
import { GlobalStyles } from '../../styles/AppStyles'; // Vérifiez le chemin

// Données d'exemple pour les ingrédients
const DUMMY_INGREDIENTS = [
  {
    id: 'ing1',
    name: 'Tomatoes', // Changer pour 'Ingredient Name' comme sur l'image
    image: require('../../../assets/images/tomato.png'), // Assurez-vous d'avoir cette image
    price: 50,
    quantity: 8, // Par défaut 8 Pics
    unit: 'Pics',
    category: 'Vegetables', // Pour le filtrage
  },
  {
    id: 'ing2',
    name: 'Bread',
    image: require('../../../assets/images/bread.png'), // Assurez-vous d'avoir cette image
    price: 100,
    quantity: 60,
    unit: 'Pics',
    category: 'Staples',
  },
  {
    id: 'ing3',
    name: 'Cheese',
    image: require('../../../assets/images/cheese.png'), // Assurez-vous d'avoir cette image
    price: 350,
    quantity: 60,
    unit: 'Pics',
    category: 'Dairy',
  },
  {
    id: 'ing4',
    name: 'Meat',
    image: require('../../../assets/images/meat.png'), // Assurez-vous d'avoir cette image
    price: 750,
    quantity: 60,
    unit: 'Pics',
    category: 'Meat',
  },
  // Ajoutez d'autres ingrédients si vous le souhaitez
];

const filters = ['ALL', 'Meat', 'Spices', 'Vegetables', 'Dairy', 'Staples']; // Adaptez les catégories

const StockScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [ingredients, setIngredients] = useState(DUMMY_INGREDIENTS); // État pour les ingrédients

  const handleSearch = () => {
    Alert.alert('Search', `Searching for: ${searchQuery}`);
    // Logique de recherche à implémenter ici
  };

  const handleFilterSelect = (filter) => {
    setActiveFilter(filter);
    // Logique de filtrage à implémenter ici
  };

  const filteredIngredients = ingredients.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'ALL' || item.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleIncreaseQuantity = (id) => {
    setIngredients(prevIngredients =>
      prevIngredients.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setIngredients(prevIngredients =>
      prevIngredients.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      )
    );
  };

  const handleDeleteIngredient = (id) => {
    Alert.alert(
      'Delete Ingredient',
      'Are you sure you want to delete this ingredient?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            setIngredients(prevIngredients => prevIngredients.filter(item => item.id !== id));
            Alert.alert('Deleted', 'Ingredient has been deleted.');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleAddIngredient = () => {
    Alert.alert('Add Ingredient', 'Navigate to add new ingredient screen or open a form.');
    // Ici, vous navigueriez vers un écran/formulaire pour ajouter un nouvel ingrédient
  };

  const ListHeader = () => (
    <View>
      <MarketHeader
        onMenuPress={() => navigation.openDrawer && navigation.openDrawer()}
        onNotificationsPress={() => Alert.alert('Notifications', 'Notifications pressed')}
        onCartPress={() => Alert.alert('Cart', 'Cart pressed')}
      />

      <View style={styles.greetingSection}>
        <Text style={styles.browseTitle}>
          Your <Text style={styles.browseIngredientsHighlight}>Ingredients</Text>
        </Text>
        <Text style={styles.browseSubtitle}>Keep a eye on your ingredients stocks</Text>
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

  const ListFooter = () => (
    <View style={styles.footerButtonContainer}>
      <AddIngredientButton onPress={handleAddIngredient} />
    </View>
  );

  return (
    <View style={GlobalStyles.container}>
      <FlatList
        data={filteredIngredients}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <IngredientCard
            ingredient={item}
            onIncrease={handleIncreaseQuantity}
            onDecrease={handleDecreaseQuantity}
            onDelete={handleDeleteIngredient}
          />
        )}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        contentContainerStyle={styles.flatListContentContainer}
      />
    </View>
  );
};

export default StockScreen;

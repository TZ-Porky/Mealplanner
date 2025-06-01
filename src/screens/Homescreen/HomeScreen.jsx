import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// Composantes
import Header from '../../components/header/Header';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import IngredientCard from '../../components/IngredientPlanCard/IngredientPlanCard';
import DateSelector from '../../components/DateSelector/DateSelector';
import MealCardPlan from '../../components/MealCardPlan/MealCardPlan';
import RecommendButton from '../../components/RecommendButton/RecommendButton';
// Styles
import styles from './HomeScreenStyle';
import {Layout, Colors} from '../../styles/AppStyles';
// Images des ingrédients
import tomatoIcon from '../../../assets/images/tomato.png';
import breadIcon from '../../../assets/images/bread.png';
import meatIcon from '../../../assets/images/meat.png';
import cheeseIcon from '../../../assets/images/cheese.png';

// Données d'exemple (elles viendraient d'une API en général)
// ========================================================================================//
const recommendedRecipes = [
  {
    id: '1',
    image: require('../../../assets/images/meal-1.png'),
    name: 'Meal Name',
    time: '30 Min',
    price: '2,500 XCFA',
    rating: 5,
    tags: ['Easy', '6 Parts'],
  },
  {
    id: '2',
    image: require('../../../assets/images/meal-2.png'),
    name: 'Meal Name',
    time: '30 Min',
    price: '2,500 XCFA',
    rating: 5,
    tags: ['Easy', '6 Parts'],
  },
  {
    id: '3',
    image: require('../../../assets/images/meal-1.png'),
    name: 'Meal Name',
    time: '50 Min',
    price: '5,500 XCFA',
    rating: 7,
    tags: ['Hard', '6 Parts', 'Family'],
  },
  // ...
];
// ========================================================================================//
const myIngredients = [
  { id: 'a', imageSource: tomatoIcon, name: 'Tomatoes', pics: 60, price: 50 },
  { id: 'b', imageSource: meatIcon, name: 'Piece of Meat', pics: 11, price: 500 },
  { id: 'c', imageSource: breadIcon, name: 'Bread Slice', pics: 30, price: 100 },
  { id: 'd', imageSource: cheeseIcon, name: 'Cheese', pics: 15, price: 150 },
];
// ========================================================================================//
const plannedMeals = [
  {
    id: 'm1',
    image: require('../../../assets/images/meal-2.png'),
    type: 'Breakfast',
    description: 'Fried Eggs With Tomatoes',
    time: '7:30AM',
  },
  {
    id: 'm2',
    image: require('../../../assets/images/meal-2.png'),
    type: 'Breakfast',
    description: 'Fried Eggs With Tomatoes',
    time: '7:30AM',
  },
];
// ========================================================================================//

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header title="Home" /> {/* Utilisez le composant Header */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Section de bienvenue */}
        <View style={styles.section}>
          <Text style={styles.greetingText}>Hi,
            <Text style={styles.greetingTextHighlight}> user!</Text>
            </Text>
          <Text style={styles.questionText}>
            Are we cooking something today?
          </Text>
        </View>
        {/* Section de recherche */}
        <View style={styles.section}>
          {/* Option 1: Intégrer directement la barre de recherche */}
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.searchIconContainer}>
              <Icon name="search-outline" size={24} color={Colors.textMedium} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Section des recettes recommandées */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended recipes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllLink}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.recipesScroll}
            contentContainerStyle={{paddingRight: 20}} // Exemple
          >
            {recommendedRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                imageSource={recipe.image}
                mealName={recipe.name}
                time={recipe.time}
                price={recipe.price}
                rating={recipe.rating}
                tags={recipe.tags}
                onPress={() => navigation.navigate('RecipeDetail', { recipe: recipe })}
              />
            ))}
          </ScrollView>
        </View>
        {/* Section des ingrédients */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My ingredients</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllLink}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ingredientsGrid}>
            {myIngredients.map(ingredient => (
              <IngredientCard
                key={ingredient.id}
                imageSource={ingredient.imageSource}
                name={ingredient.name}
                pics={ingredient.pics}
                price={ingredient.price}
                onPress={() =>
                  console.log('Ingredient pressed:', ingredient.name)
                }
              />
            ))}
          </View>
        </View>
        {/* Section de planification des repas */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Planning Meals</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllLink}>See All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.currentMonth}>May, 2025</Text>
          <DateSelector /> {/* Utilisation du composant DateSelector */}
          <View style={styles.mealPlanDetails}>
            {plannedMeals.map(meal => (
              <MealCardPlan
                key={meal.id}
                imageSource={meal.image}
                mealType={meal.type}
                description={meal.description}
                time={meal.time}
                onPress={() => console.log('Meal plan pressed:', meal.type)}
              />
            ))}
          </View>
        </View>
        {/* Bouton de recommandation */}
        <View style={styles.recommendButtonSection}>
          <RecommendButton
            onPress={() => console.log('Recommend me a meal!')}
          />
        </View>
        <View style={{height: Layout.spacing.medium}} /> {/* Marge en bas */}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

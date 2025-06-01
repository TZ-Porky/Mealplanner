import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import MarketHeader from '../../components/MarketHeader/MarketHeader'; // Réutilisation
import PeriodButtons from '../../components/PeriodButtons/PeriodButtons'; // Nouveau
import DateSelector from '../../components/DateSelector/DateSelector'; // Nouveau
import MealPlanCard from '../../components/MealCardPlan/MealCardPlan'; // Nouveau
import styles from './PlanningScreenStyles';
import { GlobalStyles } from '../../styles/AppStyles'; // Vérifiez le chemin
import Icon from 'react-native-vector-icons/Ionicons';
import { Fonts } from '../../styles/AppStyles'; // Pour la taille des icônes

// Données d'exemple pour les repas planifiés
const DUMMY_PLANNED_MEALS = [
  {
    id: 'meal1_breakfast_15',
    day: 'Thu', // Correspond au 15, Mai
    date: '2025-05-15', // Format YYYY-MM-DD
    type: 'Breakfast',
    name: 'Fried Eggs With Tomatoes',
    image: require('../../../assets/images/meal-2.png'), // Assurez-vous d'avoir cette image
    time: '7:30AM',
  },
  {
    id: 'meal1_lunch_15',
    day: 'Thu',
    date: '2025-05-15',
    type: 'Lunch',
    name: 'Fried Eggs With Tomatoes',
    image: require('../../../assets/images/meal-2.png'),
    time: '12:30PM',
  },
  {
    id: 'meal1_dinner_15_1',
    day: 'Thu',
    date: '2025-05-15',
    type: 'Dinner',
    name: 'Fried Eggs With Tomatoes',
    image: require('../../../assets/images/meal-2.png'),
    time: '7:00PM',
  },
  {
    id: 'meal1_dinner_15_2',
    day: 'Thu',
    date: '2025-05-15',
    type: 'Dinner',
    name: 'Fried Eggs With Tomatoes',
    image: require('../../../assets/images/meal-2.png'),
    time: '8:00PM',
  },
  // Ajoutez d'autres repas pour d'autres jours ou semaines si besoin
  {
    id: 'meal_other_day',
    day: 'Fri',
    date: '2025-05-16',
    type: 'Breakfast',
    name: 'Oatmeal with Berries',
    image: require('../../../assets/images/meal-1.png'),
    time: '8:00AM',
  },
];

const periods = ['This week', 'Next Week', 'Next Month']; // Filtres de période
const mealTypes = ['Breakfast', 'Lunch', 'Dinner']; // Types de repas

const PlanningScreen = ({ navigation }) => {
  const [activePeriod, setActivePeriod] = useState('This week');
  const [selectedDate, setSelectedDate] = useState(new Date('2025-05-15T10:00:00Z')); // Date du 15 Mai 2025
  const [plannedMeals, setPlannedMeals] = useState(DUMMY_PLANNED_MEALS);

  // Fonction pour filtrer les repas par date sélectionnée
  const getMealsForDate = (date) => {
    return plannedMeals.filter(meal => {
      // Comparer la date sans l'heure pour s'assurer que c'est le bon jour
      return new Date(meal.date).toDateString() === new Date(date).toDateString();
    });
  };

  const mealsForSelectedDate = getMealsForDate(selectedDate);

  const handleAddMeal = (mealType) => {
    Alert.alert('Add Meal', `Maps to add a meal for ${mealType} on ${selectedDate.toDateString()}`);
    // Ici, vous navigueriez vers un écran d'ajout/sélection de repas
    // en passant la date et le type de repas
  };

  const handleEditMeal = (mealId) => {
    Alert.alert('Edit Meal', `Edit meal with ID: ${mealId}`);
    // Ici, vous navigueriez vers un écran d'édition de repas
  };

  return (
    <ScrollView style={GlobalStyles.container} contentContainerStyle={styles.flatListContentContainer}>
      <MarketHeader
        onMenuPress={() => navigation.openDrawer && navigation.openDrawer()}
        onNotificationsPress={() => Alert.alert('Notifications', 'Notifications pressed')}
        onCartPress={() => Alert.alert('Cart', 'Cart pressed')}
        title="Planning" // Override le titre du header
      />

      <View style={styles.greetingSection}>
        <Text style={styles.browseTitle}>
          Meal <Text style={styles.browseMealHighlight}>Planning</Text>
        </Text>
        <Text style={styles.browseSubtitle}>Stay up to the date of your next meal</Text>
      </View>

      <Text style={styles.currentMonth}>May, 2025</Text>

      <PeriodButtons
        periods={periods}
        activePeriod={activePeriod}
        onSelectPeriod={setActivePeriod}
      />

      <DateSelector
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      {mealTypes.map(type => (
        <View key={type} style={styles.mealSection}>
          <View style={styles.mealSectionHeader}>
            <Text style={styles.mealSectionTitle}>{type}</Text>
            <TouchableOpacity onPress={() => handleAddMeal(type)} style={styles.addMealButton}>
              <Text style={styles.addMealButtonText}>Add Meal</Text>
              <Icon name="add" size={Fonts.sizes.large} style={styles.addMealIcon} />
            </TouchableOpacity>
          </View>
          {mealsForSelectedDate.filter(meal => meal.type === type).length > 0 ? (
            mealsForSelectedDate.filter(meal => meal.type === type).map(meal => (
              <MealPlanCard key={meal.id} meal={meal} onEdit={handleEditMeal} />
            ))
          ) : (
            // Optionnel: Message si aucun repas n'est planifié
            <Text style={{ textAlign: 'center', color: 'gray', marginTop: 10 }}>
              No {type.toLowerCase()} planned.
            </Text>
          )}
        </View>
      ))}

    </ScrollView>
  );
};

export default PlanningScreen;

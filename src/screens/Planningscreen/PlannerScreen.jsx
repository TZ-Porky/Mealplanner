import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../styles/AppStyles';
import PlanningMealModal from '../components/PlanningMealModal'; // On va créer cette modale

// Configuration de la locale pour le calendrier (Français)
LocaleConfig.locales.fr = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    '' + 'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr'; // Définir le français par défaut

const PlannerScreen = () => {

    const [selectedDate, setSelectedDate] = useState('');
  const [meals, setMeals] = useState({}); // Structure: { 'YYYY-MM-DD': [{id, name, type}, ...], ... }
  const [isMealModalVisible, setMealModalVisible] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null); // Pour l'édition, si on veut
  const [modalDate, setModalDate] = useState(''); // La date pour laquelle on veut ajouter/modifier un repas

  // Exemple de données initiales
  useEffect(() => {
    // Simuler des repas déjà planifiés
    const initialMeals = {
      '2025-06-01': [
        { id: 'm1', name: 'Poulet rôti et frites', type: 'Dîner' },
        { id: 'm2', name: 'Salade composée', type: 'Déjeuner' },
      ],
      '2025-05-28': [
        { id: 'm3', name: 'Pâtes Carbonara', type: 'Dîner' },
      ],
      '2025-05-29': [ // Marquer une date passée
          { id: 'm4', name: 'Riz cantonais', type: 'Dîner' },
      ],
    };
    setMeals(initialMeals);

    // Définir la date sélectionnée initiale sur aujourd'hui
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    setSelectedDate(todayString);
  }, []);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const handleAddOrUpdateMeal = (date, mealData) => {
    setMeals((prevMeals) => {
      const currentMealsForDate = prevMeals[date] || [];
      let updatedMealsForDate;

      if (mealData.id) {
        // C'est une mise à jour
        updatedMealsForDate = currentMealsForDate.map((meal) =>
          meal.id === mealData.id ? mealData : meal
        );
      } else {
        // C'est un nouvel ajout
        updatedMealsForDate = [
          ...currentMealsForDate,
          { ...mealData, id: generateUniqueId() },
        ];
      }

      // Supprimer la date si plus de repas après suppression
      if (updatedMealsForDate.length === 0) {
        const { [date]: removedDate, ...rest } = prevMeals;
        return rest;
      }

      return {
        ...prevMeals,
        [date]: updatedMealsForDate,
      };
    });
    setMealModalVisible(false);
    setEditingMeal(null); // Réinitialiser l'édition
    setModalDate('');
  };

  const handleDeleteMeal = (date, mealId) => {
    Alert.alert(
      'Supprimer le repas',
      'Êtes-vous sûr de vouloir supprimer ce repas ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          onPress: () => {
            setMeals((prevMeals) => {
              const updatedMealsForDate = (prevMeals[date] || []).filter(
                (meal) => meal.id !== mealId
              );
              if (updatedMealsForDate.length === 0) {
                // Si plus de repas pour cette date, supprimer la date de l'objet meals
                const { [date]: _, ...rest } = prevMeals;
                return rest;
              }
              return {
                ...prevMeals,
                [date]: updatedMealsForDate,
              };
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const openAddMealModal = (date) => {
    setEditingMeal(null); // S'assurer qu'on est en mode ajout
    setModalDate(date);
    setMealModalVisible(true);
  };

  const openEditMealModal = (date, meal) => {
    setEditingMeal(meal); // Définir le repas à éditer
    setModalDate(date);
    setMealModalVisible(true);
  };

  const getMarkedDates = () => {
    const marked = {};
    Object.keys(meals).forEach((date) => {
      marked[date] = {
        marked: true,
        dotColor: Colors.buttonPrimary,
        selected: date === selectedDate,
        selectedColor: Colors.buttonPrimary,
        // Si la date est aujourd'hui, marquez-la différemment ou passez l'option 'today'
        // Pour les dates passées, on pourrait mettre une couleur différente
        // Pour une date sélectionnée, le dotColor peut être différent du selectedColor
      };
      if (date === selectedDate) {
        marked[date].selectedColor = Colors.accentBlue; // Couleur pour la date actuellement sélectionnée
        marked[date].dotColor = 'white'; // Point blanc sur le fond bleu
      }
    });

    // Marquer la date sélectionnée même si elle n'a pas de repas
    if (selectedDate && !marked[selectedDate]) {
      marked[selectedDate] = { selected: true, selectedColor: Colors.accentBlue };
    } else if (selectedDate && marked[selectedDate]) {
      marked[selectedDate].selected = true;
      marked[selectedDate].selectedColor = Colors.accentBlue;
    }

    return marked;
  };

  const todayString = new Date().toISOString().split('T')[0];
  const mealsForSelectedDate = meals[selectedDate] || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Mon Planning Repas</Text>

        <Calendar
          onDayPress={onDayPress}
          markedDates={getMarkedDates()}
          // Afficher le mois en cours au démarrage
          current={todayString}
          // Activer le swipe pour changer de mois
          enableSwipeMonths={true}
          // Cacher les jours des mois précédents/suivants
          hideExtraDays={true}
          // Thème personnalisé
          theme={{
            backgroundColor: Colors.cardBackground,
            calendarBackground: Colors.cardBackground,
            textSectionTitleColor: Colors.textDark,
            selectedDayBackgroundColor: Colors.buttonPrimary,
            selectedDayTextColor: '#ffffff',
            todayTextColor: Colors.accentBlue, // Couleur pour "aujourd'hui"
            dayTextColor: Colors.textDark,
            textDisabledColor: '#d9e1e8',
            dotColor: Colors.buttonPrimary, // Couleur des points pour les jours marqués
            selectedDotColor: '#ffffff', // Couleur des points pour les jours sélectionnés et marqués
            arrowColor: Colors.buttonPrimary,
            monthTextColor: Colors.textDark,
            textDayFontFamily: 'System',
            textMonthFontFamily: 'System',
            textDayHeaderFontFamily: 'System',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
          style={styles.calendar}
        />

        {/* Section pour les repas de la date sélectionnée */}
        <View style={styles.mealsSection}>
          <View style={styles.mealsHeader}>
            <Text style={styles.mealsTitle}>
              Repas pour le {selectedDate ? selectedDate.split('-').reverse().join('/') : 'une date'}
            </Text>
            <TouchableOpacity onPress={() => openAddMealModal(selectedDate)} style={styles.addMealButton}>
              <Ionicons name="add-circle-outline" size={28} color={Colors.buttonPrimary} />
            </TouchableOpacity>
          </View>

          {mealsForSelectedDate.length > 0 ? (
            <FlatList
              data={mealsForSelectedDate}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.mealItem}
                  onPress={() => openEditMealModal(selectedDate, item)} // Pour éditer le repas
                >
                  <Text style={styles.mealItemType}>{item.type}:</Text>
                  <Text style={styles.mealItemName}>{item.name}</Text>
                  <TouchableOpacity onPress={() => handleDeleteMeal(selectedDate, item.id)} style={styles.deleteMealButton}>
                    <Ionicons name="trash-outline" size={20} color={Colors.textMedium} />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.mealsListContent}
            />
          ) : (
            <Text style={styles.noMealsText}>
              Aucun repas prévu pour cette date. Cliquez sur '+' pour en ajouter un !
            </Text>
          )}
        </View>

        {/* Espace pour éviter que le contenu ne soit caché par la BottomNavBar */}
        <View style={{ height: 80 }} />

        {/* Modale pour ajouter/éditer un repas */}
        <PlanningMealModal
          isVisible={isMealModalVisible}
          onClose={() => {
            setMealModalVisible(false);
            setEditingMeal(null); // Réinitialiser l'édition à la fermeture
            setModalDate('');
          }}
          onSaveMeal={handleAddOrUpdateMeal}
          initialMealData={editingMeal} // Passe le repas à éditer (null si ajout)
          date={modalDate} // Passe la date sélectionnée à la modale
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
  },
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: 10,
  },
  calendar: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  mealsSection: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    marginBottom: 10,
  },
  mealsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  mealsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  addMealButton: {
    padding: 5,
  },
  mealsListContent: {
    paddingBottom: 10, // Espace pour la FlatList
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accentBlue, // petite barre colorée sur le côté
  },
  mealItemType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textMedium,
    marginRight: 5,
  },
  mealItemName: {
    flex: 1,
    fontSize: 16,
    color: Colors.textDark,
  },
  deleteMealButton: {
    padding: 5,
    marginLeft: 10,
  },
  noMealsText: {
    fontSize: 15,
    color: Colors.textMedium,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PlannerScreen;

// src/components/IngredientsSection/IngredientsSection.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './IngredientsSectionStyles';
import { Colors, Fonts } from '../../styles/AppStyles';

const IngredientsSection = ({ ingredientsList, estimatedTotal }) => { // ingredientsList est maintenant les ingrédients mis à l'échelle
  // Initialisez checkedIngredients à partir des props reçues
  const [checkedIngredientsState, setCheckedIngredientsState] = useState(() =>
    ingredientsList.map(item => ({ ...item, checked: false }))
  );


  // Mettez à jour checkedIngredients lorsque ingredientsList change (e.g., quand les parts sont modifiées)
  useEffect(() => {
    // Ce useEffect s'exécutera lorsque ingredientsList change (par exemple, les parts changent)
    // Nous devons fusionner la nouvelle ingredientsList avec l'état actuel des éléments cochés
    // afin de préserver les coches pour les ingrédients qui existent toujours.
    setCheckedIngredientsState(prevCheckedIngredients => {
      return ingredientsList.map(newItem => {
        const existingItem = prevCheckedIngredients.find(
          oldItem => oldItem.id === newItem.id
        );
        // Si l'élément existe et était coché, gardez-le coché.
        // Sinon, c'est un nouvel élément ou un élément qui n'était pas coché, donc par défaut à false.
        return {
          ...newItem,
          checked: existingItem ? existingItem.checked : false,
        };
      });
    });
  }, [ingredientsList]);// Re-crée la liste des ingrédients cochés si la liste des ingrédients change

  const toggleCheckbox = (id) => {
    setCheckedIngredientsState(prevState =>
      prevState.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <View>
      {checkedIngredientsState.map((item, index) =>
        <View key={item.id} style={[styles.row, index === ingredientsList.length - 1 && styles.lastRow]}>
          <Text style={styles.ingredientText}>{item.name}</Text>
          <Text style={styles.quantityText}>{item.quantity} {item.unit}</Text> {/* Affiche aussi l'unité */}
          <TouchableOpacity
            style={[styles.checkbox, item.checked && styles.checkedCheckbox]}
            onPress={() => toggleCheckbox(item.id)}
          >
            {item.checked && (
              <Icon name="checkmark" size={Fonts.sizes.medium} color={Colors.textLight} style={styles.checkboxIcon} />
            )}
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalPrice}>{estimatedTotal} XCFA</Text>
      </View>
    </View>
  );
};

export default IngredientsSection;

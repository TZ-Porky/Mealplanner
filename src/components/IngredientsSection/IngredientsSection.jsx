// src/components/IngredientsSection/IngredientsSection.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './IngredientsSectionStyles';
import { Colors, Fonts } from '../../styles/AppStyles';

const IngredientsSection = ({ ingredientsList, estimatedTotal }) => { // ingredientsList est maintenant les ingrédients mis à l'échelle
  // Initialisez checkedIngredients à partir des props reçues
  const [checkedIngredients, setCheckedIngredients] = useState(
    ingredientsList.map(item => ({ ...item, checked: false }))
  );

  // Mettez à jour checkedIngredients lorsque ingredientsList change (e.g., quand les parts sont modifiées)
  useEffect(() => {
    setCheckedIngredients(
      ingredientsList.map(item => {
        // Tente de conserver l'état "checked" si l'ingrédient existe déjà
        const existing = checkedIngredients.find(ci => ci.id === item.id);
        return { ...item, checked: existing ? existing.checked : false };
      })
    );
  }, [checkedIngredients, ingredientsList]); // Re-crée la liste des ingrédients cochés si la liste des ingrédients change

  const toggleCheckbox = (id) => {
    setCheckedIngredients(prevState =>
      prevState.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <View>
      {checkedIngredients.map((item, index) => (
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
      ))}
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalPrice}>{estimatedTotal} XCFA</Text>
      </View>
    </View>
  );
};

export default IngredientsSection;

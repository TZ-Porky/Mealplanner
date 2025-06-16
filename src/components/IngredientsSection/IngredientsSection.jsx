/* eslint-disable react-native/no-inline-styles */
// src/components/IngredientsSection/IngredientsSection.js
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './IngredientsSectionStyles';
import {Colors, Fonts} from '../../styles/AppStyles';

const IngredientsSection = ({ingredients = []}) => {
  // Removed estimatedTotal from props as it will be calculated
  // Initialisez checkedIngredients à partir des props reçues
  const [checkedIngredientsState, setCheckedIngredientsState] = useState(() =>
    ingredients.map(item => ({
      ...item,
      id: item.name, // Use name as a unique identifier for checklist purposes
      checked: false,
    })),
  );

  // Mettez à jour checkedIngredients lorsque ingredients change (e.g., quand les parts sont modifiées)
  useEffect(() => {
    setCheckedIngredientsState(prevCheckedIngredients => {
      return ingredients.map(newItem => {
        const existingItem = prevCheckedIngredients.find(
          oldItem => oldItem.id === newItem.name, // Compare with newItem.name
        );
        return {
          ...newItem,
          id: newItem.name, // Ensure new items also have name as id
          checked: existingItem ? existingItem.checked : false,
        };
      });
    });
  }, [ingredients]);

  const toggleCheckbox = id => {
    setCheckedIngredientsState(prevState =>
      prevState.map(item =>
        item.id === id ? {...item, checked: !item.checked} : item,
      ),
    );
  };

  // Calculate the total estimated cost
  const calculateTotalCost = () => {
    return checkedIngredientsState.reduce((total, item) => {
      if (item.checked && item.unitCost && item.quantity) {
        return total + item.unitCost * item.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <View>
      {checkedIngredientsState.map((item, index) => (
        <View
          key={item.id}
          style={[
            styles.row,
            index === ingredients.length - 1 && styles.lastRow,
          ]}>
          <Text style={styles.ingredientText}>{item.name}</Text>
          <Text style={styles.quantityText}>
            {typeof item.quantity === 'number' ? item.quantity.toFixed(2) : '—'}{' '}
            {item.unitOfMeasure || ''}
          </Text>

          <TouchableOpacity
            style={[styles.checkbox, item.checked && styles.checkedCheckbox]}
            onPress={() => toggleCheckbox(item.id)}>
            {item.checked && (
              <Icon
                name="checkmark"
                size={Fonts.sizes.medium}
                color={Colors.textLight}
                style={styles.checkboxIcon}
              />
            )}
          </TouchableOpacity>
        </View>
      ))}
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>
          Total
        </Text>
        <Text style={styles.totalPrice}>
          {calculateTotalCost().toFixed(2)} XCFA
        </Text>
      </View>
    </View>
  );
};

export default IngredientsSection;

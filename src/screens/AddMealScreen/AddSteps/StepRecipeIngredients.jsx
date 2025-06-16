/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Button from '../../../components/common/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ingredient from '../../../models/Ingredient'; // Correct: Importe le modèle Ingredient

const StepRecipeIngredients = ({onNext, onBack, initialData}) => {
  const [currentIngredientName, setCurrentIngredientName] = useState('');
  const [currentIngredientQty, setCurrentIngredientQty] = useState('');
  const [currentIngredientUnit, setCurrentIngredientUnit] = useState('');
  const [currentIngredientCategory, setCurrentIngredientCategory] =
    useState('');
  const [currentIngredientCost, setCurrentIngredientCost] = useState('');
  // Utilise initialData.ingredients qui contient déjà les objets Ingredient
  const [ingredients, setIngredients] = useState(initialData.ingredients || []);

  const handleAddIngredient = () => {
    if (
      !currentIngredientName ||
      !currentIngredientQty ||
      !currentIngredientUnit
    ) {
      Alert.alert(
        'Erreur',
        "Veuillez remplir le nom, la quantité et l'unité de l'ingrédient.",
      );
      return;
    }
    if (isNaN(parseFloat(currentIngredientQty))) {
      Alert.alert('Erreur', 'La quantité doit être un nombre.');
      return;
    }
    if (currentIngredientCost && isNaN(parseFloat(currentIngredientCost))) {
      Alert.alert('Erreur', 'Le coût unitaire doit être un nombre.');
      return;
    }

    const newIngredient = new Ingredient(
      currentIngredientName,
      parseFloat(currentIngredientQty),
      currentIngredientUnit,
      currentIngredientCategory || 'Unspecified', // Renommé 'Non spécifiée' en 'Unspecified' pour cohérence
      parseFloat(currentIngredientCost || '0'),
    );
    setIngredients([...ingredients, newIngredient]);
    setCurrentIngredientName('');
    setCurrentIngredientQty('');
    setCurrentIngredientUnit('');
    setCurrentIngredientCategory('');
    setCurrentIngredientCost('');
  };

  const handleRemoveIngredient = indexToRemove => {
    setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
  };

  const handleNextStep = () => {
    if (ingredients.length === 0) {
      Alert.alert(
        'Attention',
        'Veuillez ajouter au moins un ingrédient pour la recette.',
      );
      return;
    }
    onNext({ingredients});
  };

  return (
    <ScrollView style={stepStyles.scrollView} keyboardShouldPersistTaps="handled">
      <View style={stepStyles.section}>
        <Text style={stepStyles.sectionTitle}>Ingrédients</Text>

        <TextInput
          style={stepStyles.input}
          placeholder="Nom de l'ingrédient (Ex: Tomate)"
          value={currentIngredientName}
          onChangeText={setCurrentIngredientName}
        />
        <View style={stepStyles.row}>
          <TextInput
            style={[stepStyles.input, {flex: 1, marginRight: 10}]}
            placeholder="Quantité (Ex: 250)"
            keyboardType="numeric"
            value={currentIngredientQty}
            onChangeText={setCurrentIngredientQty}
          />
          <TextInput
            style={[stepStyles.input, {flex: 1}]}
            placeholder="Unité (Ex: g, ml, pièce)"
            value={currentIngredientUnit}
            onChangeText={setCurrentIngredientUnit}
          />
        </View>
        <View style={stepStyles.row}>
          <TextInput
            style={[stepStyles.input, {flex: 1, marginRight: 10}]}
            placeholder="Catégorie (Ex: Légumes)"
            value={currentIngredientCategory}
            onChangeText={setCurrentIngredientCategory}
          />
          <TextInput
            style={[stepStyles.input, {flex: 1}]}
            placeholder="Coût unitaire (Ex: 50)"
            keyboardType="numeric"
            value={currentIngredientCost}
            onChangeText={setCurrentIngredientCost}
          />
        </View>
        <Button title="Ajouter l'ingrédient" onPress={handleAddIngredient} />

        <View style={stepStyles.listContainer}>
          {ingredients.map((ing, index) => (
            <View key={index} style={stepStyles.listItem}>
              {/* Accès aux propriétés renommées de l'objet Ingredient */}
              <Text>{`${ing.name} - ${ing.quantity} ${ing.unitOfMeasure}`}</Text>
              <TouchableOpacity onPress={() => handleRemoveIngredient(index)}>
                <Ionicons name="close-circle" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={stepStyles.buttonRow}>
        <Button
          title="Retour"
          onPress={onBack}
          outlined={true}
          style={{flex: 1, marginRight: 10}}
        />
        <Button title="Suivant" onPress={handleNextStep} style={{flex: 2}} />
      </View>
    </ScrollView>
  );
};

const stepStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fef3eb',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30, // Espace en bas pour le bouton
  },
});

export default StepRecipeIngredients;

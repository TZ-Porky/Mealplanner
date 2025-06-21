/* eslint-disable react-native/no-inline-styles */
// ShoppingListFormScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ShoppingListServices from '../../services/ShoppingListServices';
import ShoppingListItem from '../../models/ElementListeCourse';
import ShoppingList from '../../models/ListeCourse';
import auth from '@react-native-firebase/auth';
import Button from '../../components/common/Button';
import { Picker } from '@react-native-picker/picker';

const ShoppingListFormScreen = ({ navigation, route }) => {
  const editingList = route.params?.list || null;

  const [listName, setListName] = useState(editingList?.name || '');
  const [recipeName, setRecipeName] = useState(editingList?.recipeName || '');
  const [items, setItems] = useState(editingList?.items || []);

  const [currentName, setCurrentName] = useState('');
  const [currentQty, setCurrentQty] = useState('');
  const [currentUnit, setCurrentUnit] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentType, setCurrentType] = useState('Ingrédient');
  const [currentPrice, setCurrentPrice] = useState('');

  const handleAddItem = () => {
    if (!currentName || !currentQty || !currentUnit) {
      Alert.alert('Erreur', 'Nom, quantité et unité sont requis.');
      return;
    }
    if (isNaN(parseFloat(currentQty))) {
      Alert.alert('Erreur', 'La quantité doit être un nombre.');
      return;
    }
    if (currentPrice && isNaN(parseFloat(currentPrice))) {
      Alert.alert('Erreur', 'Le prix doit être un nombre.');
      return;
    }
    const newItem = new ShoppingListItem(
      currentName,
      parseFloat(currentQty),
      currentUnit,
      currentCategory,
      currentType,
      false,
      parseFloat(currentPrice || 0)
    );
    setItems([...items, newItem]);
    setCurrentName('');
    setCurrentQty('');
    setCurrentUnit('');
    setCurrentCategory('');
    setCurrentType('Ingrédient');
    setCurrentPrice('');
  };

  const handleRemoveItem = index => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!listName.trim()) {
      Alert.alert('Erreur', 'Le nom de la liste est requis.');
      return;
    }
    if (items.length === 0) {
      Alert.alert('Erreur', 'Ajoutez au moins un élément à la liste.');
      return;
    }

    try {
      const userId = auth().currentUser?.uid;
      const list = new ShoppingList(
        editingList?.id || null,
        userId,
        listName,
        recipeName,
        items
      );
      if (editingList) {
        await ShoppingListServices.updateShoppingList(editingList.id, list.toPlainObject());
      } else {
        await ShoppingListServices.createShoppingList(list);
      }
      Alert.alert('Succès', 'Ajout réussi');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Erreur', 'Échec de l\'enregistrement.');
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>{editingList ? 'Modifier la liste' : 'Nouvelle liste'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom de la liste"
        value={listName}
        onChangeText={setListName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom de la recette (optionnel)"
        value={recipeName}
        onChangeText={setRecipeName}
      />

      <Text style={styles.subtitle}>Ajouter un élément</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom de l'élément"
        value={currentName}
        onChangeText={setCurrentName}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 8 }]}
          placeholder="Quantité"
          keyboardType="numeric"
          value={currentQty}
          onChangeText={setCurrentQty}
        />
        <Picker
          selectedValue={currentUnit}
          onValueChange={value => setCurrentUnit(value)}
          style={[styles.input, { flex: 1 }]}
        >
          <Picker.Item label="Unité" value="" />
          <Picker.Item label="g" value="g" />
          <Picker.Item label="ml" value="ml" />
          <Picker.Item label="pièce" value="pièce" />
          <Picker.Item label="kg" value="kg" />
          <Picker.Item label="L" value="L" />
        </Picker>
      </View>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 8 }]}
          placeholder="Catégorie"
          value={currentCategory}
          onChangeText={setCurrentCategory}
        />
        <Picker
          selectedValue={currentType}
          onValueChange={value => setCurrentType(value)}
          style={[styles.input, { flex: 1 }]}
        >
          <Picker.Item label="Type" value="" />
          <Picker.Item label="Ingrédient" value="Ingrédient" />
          <Picker.Item label="Ustensile" value="Ustensile" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Prix de l'élément (optionnel)"
        keyboardType="numeric"
        value={currentPrice}
        onChangeText={setCurrentPrice}
      />

      <Button title="Ajouter l'élément" onPress={handleAddItem} />

      <View style={styles.itemList}>
        {items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text>{`${item.name} - ${item.quantity} ${item.unitOfMeasure} (${item.price || 0} FCFA)`}</Text>
            <TouchableOpacity onPress={() => handleRemoveItem(index)}>
              <Ionicons name="close-circle" size={22} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Button
        title={editingList ? 'Modifier la liste' : 'Créer la liste'}
        onPress={handleSave}
        style={{ marginTop: 20 }}
      />
    </ScrollView>
  );
};

export default ShoppingListFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemList: {
    marginTop: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
});

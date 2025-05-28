import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../styles/AppStyles';
import styles from './StocksScreenStyle'; // Styles spécifiques à StocksScreen

import AddItemModal from '../components/AddItemModal'; // <-- Importer la nouvelle modale

const StocksScreen = () => {
  const [stockItems, setStockItems] = useState([
    { id: '1', name: 'Riz', quantity: '500g', category: 'Céréales', expiryDate: '2025-12-31' },
    { id: '2', name: 'Poitrine de poulet', quantity: '2', category: 'Viandes', expiryDate: '2025-06-01' },
    { id: '3', name: 'Carottes', quantity: '3', category: 'Légumes', expiryDate: '2025-05-28' }, // Bientôt périmé
    { id: '4', name: 'Huile d\'olive', quantity: '1L', category: 'Huiles', expiryDate: '2026-01-01' },
  ]);
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const handleAddItemToStock = (newItem) => {
    setStockItems([
      ...stockItems,
      {
        id: generateUniqueId(),
        name: newItem.name,
        quantity: newItem.quantity || 'Qté',
        category: newItem.category || 'Divers',
        expiryDate: newItem.expiryDate || 'N/A',
      },
    ]);
    Alert.alert('Succès', `${newItem.name} ajouté au stock !`);
  };

  const handleDeleteItem = (id) => {
    Alert.alert(
      'Supprimer l\'ingrédient',
      'Êtes-vous sûr de vouloir supprimer cet ingrédient de votre stock ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', onPress: () => setStockItems(stockItems.filter((item) => item.id !== id)) },
      ],
      { cancelable: true }
    );
  };

  const isExpiringSoon = (expiryDate) => {
    if (expiryDate === 'N/A') {return false;}
    const today = new Date();
    const expires = new Date(expiryDate);
    const diffTime = expires.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0; // Expire dans 7 jours ou moins
  };

  const isExpired = (expiryDate) => {
      if (expiryDate === 'N/A') {return false;}
      const today = new Date();
      const expires = new Date(expiryDate);
      return expires.getTime() < today.getTime();
  };

  const renderItem = ({ item }) => (
    <View style={[
        styles.itemContainer,
        isExpiringSoon(item.expiryDate) && styles.itemExpiringSoon,
        isExpired(item.expiryDate) && styles.itemExpired,
    ]}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>{item.quantity}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
        {item.expiryDate !== 'N/A' && (
          <Text style={[styles.itemExpiry, isExpiringSoon(item.expiryDate) && styles.expiryWarningText, isExpired(item.expiryDate) && styles.expiryExpiredText]}>
            Expire le: {item.expiryDate}
          </Text>
        )}
      </View>
      <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color={Colors.textMedium} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mon Inventaire</Text>
          <TouchableOpacity onPress={() => setAddModalVisible(true)} style={styles.addButtonHeader}>
            <Ionicons name="add-circle-outline" size={30} color={Colors.buttonPrimary} />
          </TouchableOpacity>
        </View>

        {/* Liste des ingrédients */}
        <FlatList
          data={stockItems.sort((a,b) => {
            // Trie par date de péremption, les 'N/A' à la fin
            if (a.expiryDate === 'N/A' && b.expiryDate === 'N/A') {return 0;}
            if (a.expiryDate === 'N/A') {return 1;}
            if (b.expiryDate === 'N/A') {return -1;}
            return new Date(a.expiryDate) - new Date(b.expiryDate);
          })}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContentContainer}
          ListEmptyComponent={() => (
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>Votre stock est vide. Ajoutez des ingrédients !</Text>
            </View>
          )}
        />

        {/* Espace pour éviter que le contenu ne soit caché par la BottomNavBar */}
        <View style={{ height: 80 }} />

        {/* Modal pour ajouter un ingrédient */}
        <AddItemModal
          isVisible={isAddModalVisible}
          onClose={() => setAddModalVisible(false)}
          onAddItem={handleAddItemToStock}
          type="stock" // Indique que c'est pour un article de stock
        />
      </View>
    </SafeAreaView>
  );
};

export default StocksScreen;

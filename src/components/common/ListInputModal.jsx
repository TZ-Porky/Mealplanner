import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './ListInputModalStyles';
import { Fonts } from '../../styles/AppStyles'; // Ajustez le chemin si nécessaire

const ListInputModal = ({ visible, onClose, title, data, onSave }) => {
  const [items, setItems] = useState(data);
  const [newItem, setNewItem] = useState('');

  // S'assurer que les items sont synchronisés lorsque la modale s'ouvre
  React.useEffect(() => {
    setItems(data);
  }, [data, visible]);

  const handleAddItem = () => {
    if (newItem.trim() && !items.includes(newItem.trim())) {
      setItems([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (itemToRemove) => {
    setItems(items.filter(item => item !== itemToRemove));
  };

  const handleSave = () => {
    onSave(items);
    onClose();
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItemContainer}>
      <Text style={styles.listItemText}>{item}</Text>
      <TouchableOpacity onPress={() => handleRemoveItem(item)} style={styles.removeButton}>
        <Ionicons name="close-circle" size={Fonts.sizes.large} style={styles.removeIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={Fonts.sizes.xLarge} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={`Add new ${title.toLowerCase().slice(0, -1) || 'item'}`} // Ex: "Add new ingredient"
              value={newItem}
              onChangeText={setNewItem}
              onSubmitEditing={handleAddItem}
              returnKeyType="done"
            />
            <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          {items.length > 0 ? (
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={(item, index) => item + index} // Utiliser l'index pour clé si les items peuvent être dupliqués
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.emptyListText}>No {title.toLowerCase()} added yet.</Text>
          )}

          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ListInputModal;

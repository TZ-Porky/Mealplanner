import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './MultilineTextInputModalStyles';
import { Fonts } from '../../styles/AppStyles'; // Ajustez le chemin si nécessaire

const MultilineTextInputModal = ({ visible, onClose, title, initialValue, onSave }) => {
  const [text, setText] = useState(initialValue);

  // S'assurer que le texte est synchronisé lorsque la modale s'ouvre
  React.useEffect(() => {
    setText(initialValue);
  }, [initialValue, visible]);

  const handleSave = () => {
    onSave(text);
    onClose();
  };

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

          <TextInput
            style={styles.textInput}
            multiline={true}
            placeholder={`Enter ${title.toLowerCase()} here...`}
            value={text}
            onChangeText={setText}
            autoFocus={true}
          />

          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MultilineTextInputModal;

import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import styles from './ProfileScreenStyle';
import { COLORS } from './ProfileColors';

export default function ProfileFamily({
  family,
  newMemberName, setNewMemberName,
  newMemberSex, setNewMemberSex,
  newMemberAge, setNewMemberAge,
  newMemberAllergies, setNewMemberAllergies,
  handleAddFamilyMember,
  handleDeleteFamilyMember,
  darkMode
}) {
  const isFormValid = newMemberName.trim() && newMemberSex && newMemberAge.trim();

  return (
    <View style={[styles.card, darkMode && { backgroundColor: COLORS.DARK_CARD }]}>
      <Text style={[styles.sectionTitle, darkMode && { color: COLORS.ORANGE }]}>Membres de la famille</Text>
      <FlatList
        data={family}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.familyRow, darkMode && { backgroundColor: '#292929' }]}>
            <Text style={[styles.familyItem, darkMode && { color: COLORS.DARK_TEXT }]}>
              {item.fullName} ({item.sexe}, {item.age} ans)
              {item.allergies && item.allergies.length > 0
                ? ` | Allergies: ${item.allergies.join(', ')}`
                : ''}
            </Text>
            <TouchableOpacity
              onPress={() => handleDeleteFamilyMember(item.id)}
              style={styles.deleteBtn}
            >
              <Text style={styles.deleteBtnText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={[styles.empty, darkMode && { color: COLORS.DARK_GRAY }]}>Aucun membre</Text>}
      />
      <View style={{ marginTop: 12 }}>
        <TextInput
          style={[styles.input, darkMode && { backgroundColor: COLORS.DARK_CARD, color: COLORS.DARK_TEXT, borderColor: COLORS.ORANGE }]}
          placeholder="Nom complet"
          placeholderTextColor={darkMode ? COLORS.DARK_GRAY : COLORS.GRAY}
          value={newMemberName}
          onChangeText={setNewMemberName}
        />
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: newMemberSex === 'Homme' ? COLORS.ORANGE : (darkMode ? COLORS.DARK_CARD : COLORS.LIGHT_GRAY),
              borderRadius: 8,
              padding: 10,
              marginRight: 5,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: COLORS.ORANGE,
            }}
            onPress={() => setNewMemberSex('Homme')}
          >
            <Text style={{ color: newMemberSex === 'Homme' ? COLORS.WHITE : (darkMode ? COLORS.DARK_TEXT : '#222'), fontWeight: 'bold' }}>Homme</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: newMemberSex === 'Femme' ? COLORS.ORANGE : (darkMode ? COLORS.DARK_CARD : COLORS.LIGHT_GRAY),
              borderRadius: 8,
              padding: 10,
              marginLeft: 5,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: COLORS.ORANGE,
            }}
            onPress={() => setNewMemberSex('Femme')}
          >
            <Text style={{ color: newMemberSex === 'Femme' ? COLORS.WHITE : (darkMode ? COLORS.DARK_TEXT : '#222'), fontWeight: 'bold' }}>Femme</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={[styles.input, darkMode && { backgroundColor: COLORS.DARK_CARD, color: COLORS.DARK_TEXT, borderColor: COLORS.ORANGE }]}
          placeholder="Âge"
          placeholderTextColor={darkMode ? COLORS.DARK_GRAY : COLORS.GRAY}
          value={newMemberAge}
          onChangeText={text => setNewMemberAge(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          maxLength={3}
        />
        <TextInput
          style={[styles.input, darkMode && { backgroundColor: COLORS.DARK_CARD, color: COLORS.DARK_TEXT, borderColor: COLORS.ORANGE }]}
          placeholder="Allergies (séparées par des virgules)"
          placeholderTextColor={darkMode ? COLORS.DARK_GRAY : COLORS.GRAY}
          value={newMemberAllergies}
          onChangeText={setNewMemberAllergies}
        />
        <TouchableOpacity
          style={[styles.saveBtn, !isFormValid && { opacity: 0.5 }]}
          onPress={handleAddFamilyMember}
          disabled={!isFormValid}
        >
          <Text style={styles.saveBtnText}>Ajouter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
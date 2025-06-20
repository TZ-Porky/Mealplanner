import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './ProfileScreenStyle';
import { COLORS } from './ProfileColors';

export default function ProfileBugReport({ bugReport, setBugReport, handleSendBugReport, darkMode }) {
  return (
    <View style={[styles.card, darkMode && { backgroundColor: COLORS.DARK_CARD }]}>
      <Text style={[styles.sectionTitle, darkMode && { color: COLORS.ORANGE }]}>Signaler un bug</Text>
      <TextInput
        style={[styles.input, { minHeight: 60, textAlignVertical: 'top' }, darkMode && { backgroundColor: COLORS.DARK_CARD, color: COLORS.DARK_TEXT, borderColor: COLORS.ORANGE }]}
        placeholder="Décris le bug ici..."
        placeholderTextColor={darkMode ? COLORS.DARK_GRAY : COLORS.GRAY}
        value={bugReport}
        onChangeText={setBugReport}
        multiline
      />
      <TouchableOpacity
        onPress={handleSendBugReport}
        style={styles.bugBtn}
      >
        <Text style={styles.bugBtnText}>Envoyer</Text>
      </TouchableOpacity>
    </View>
  );
}
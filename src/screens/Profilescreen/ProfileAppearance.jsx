import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './ProfileScreenStyle';
import { COLORS } from './ProfileColors';

export default function ProfileAppearance({ darkMode, handleToggleDarkMode }) {
  return (
    <View style={[styles.card, darkMode && { backgroundColor: COLORS.DARK_CARD }]}>
      <Text style={[styles.sectionTitle, darkMode && { color: COLORS.ORANGE }]}>Apparence</Text>
      <View style={styles.preferenceRow}>
        <Text style={[styles.preferenceLabel, darkMode && { color: COLORS.DARK_TEXT }]}>Mode sombre</Text>
        <TouchableOpacity onPress={handleToggleDarkMode}>
          <View style={[styles.switch, darkMode ? styles.switchOn : styles.switchOff]}>
            <View style={styles.switchThumb(darkMode)} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
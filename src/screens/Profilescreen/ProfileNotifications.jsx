import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './ProfileScreenStyle';
import { COLORS } from './ProfileColors';

export default function ProfileNotifications({ notificationsEnabled, handleToggleNotifications, darkMode }) {
  return (
    <View style={[styles.card, darkMode && { backgroundColor: COLORS.DARK_CARD }]}>
      <Text style={[styles.sectionTitle, darkMode && { color: COLORS.ORANGE }]}>Notifications</Text>
      <View style={styles.preferenceRow}>
        <Text style={[styles.preferenceLabel, darkMode && { color: COLORS.DARK_TEXT }]}>Activer les notifications</Text>
        <TouchableOpacity onPress={handleToggleNotifications}>
          <View style={[styles.switch, notificationsEnabled ? styles.switchOn : styles.switchOff]}>
            <View style={styles.switchThumb(notificationsEnabled)} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
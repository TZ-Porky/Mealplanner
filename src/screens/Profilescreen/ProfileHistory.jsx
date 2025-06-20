import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './ProfileScreenStyle';
import { COLORS } from './ProfileColors';

export default function ProfileHistory({ history, handleAddHistory, darkMode }) {
  return (
    <View style={[styles.card, darkMode && { backgroundColor: COLORS.DARK_CARD }]}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, darkMode && { color: COLORS.ORANGE }]}>Historique</Text>
        <TouchableOpacity onPress={handleAddHistory} style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ Test</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.historyItem, darkMode && { backgroundColor: '#292929' }]}>
            <Text style={[styles.historyAction, darkMode && { color: COLORS.DARK_TEXT }]}>{item.action}</Text>
            <Text style={[styles.historyDate, darkMode && { color: COLORS.DARK_GRAY }]}>{new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={[styles.empty, darkMode && { color: COLORS.DARK_GRAY }]}>Aucun historique</Text>}
      />
    </View>
  );
}
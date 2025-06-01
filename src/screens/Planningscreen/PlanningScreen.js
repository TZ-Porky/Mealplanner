// screens/PlanningScreen.js
import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const days = [
  { name: 'Mon', date: 12 },
  { name: 'Tue', date: 13 },
  { name: 'Wed', date: 14 },
  { name: 'Thu', date: 15 },
  { name: 'Fri', date: 16 },
  { name: 'Sat', date: 17 },
  { name: 'Sun', date: 18 },
];

const PlanningScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Ionicons name="menu" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Planning</Text>
        </View>
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="cart-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Month */}
      <Text style={styles.month}>May, 2025</Text>

      {/* Calendar */}
      <View style={styles.calendarRow}>
        {days.map((day, index) => (
          <View key={index} style={styles.dayBox}>
            <Text style={styles.dayName}>{day.name}</Text>
            <Text style={styles.dayDate}>{day.date}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 12 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
    color: '#333',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginLeft: 16,
  },
  month: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginVertical: 12,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayBox: {
    width: 45,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  dayDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F57C00',
    marginTop: 2,
  },
});

export default PlanningScreen;
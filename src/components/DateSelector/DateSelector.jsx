// src/components/DateSelector/DateSelector.js
import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import styles from './DateSelectorStyles';
import {format, addDays} from 'date-fns';

const DateSelector = ({selectedDate, onSelectDate}) => {
  const [currentSelectedDate, setCurrentSelectedDate] = useState(
    selectedDate || new Date(),
  );

  // Générer les 7 prochains jours
  const dates = Array.from({length: 7}).map((_, i) => addDays(new Date(), i));

  const handlePress = date => {
    setCurrentSelectedDate(date);
    if (onSelectDate) {
      onSelectDate(date);
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {dates.map((date, index) => {
        const isSelected =
          format(currentSelectedDate, 'yyyy-MM-dd') ===
          format(date, 'yyyy-MM-dd');
        return (
          <TouchableOpacity
            key={index}
            style={[styles.dateItem, isSelected && styles.activeDateItem]}
            onPress={() => handlePress(date)}>
            <Text style={[styles.dayText, isSelected && styles.activeDayText]}>
              {format(date, 'EEE')} {/* Ex: Lun, Mar */}
            </Text>
            <Text
              style={[styles.dateText, isSelected && styles.activeDateText]}>
              {format(date, 'dd')} {/* Ex: 15, 16 */}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default DateSelector;

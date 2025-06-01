import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './PeriodButtonsStyles';

const PeriodButtons = ({ periods, activePeriod, onSelectPeriod }) => {
  return (
    <View style={styles.container}>
      {periods.map((period) => (
        <TouchableOpacity
          key={period}
          style={[styles.button, activePeriod === period && styles.activeButton]}
          onPress={() => onSelectPeriod(period)}
        >
          <Text style={[styles.buttonText, activePeriod === period && styles.activeButtonText]}>
            {period}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PeriodButtons;

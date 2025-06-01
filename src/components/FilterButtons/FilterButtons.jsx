import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import styles from './FilterButtonsStyles';

const FilterButtons = ({ filters, activeFilter, onSelectFilter }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterContainer}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.filterButton,
            activeFilter === filter && styles.activeButton,
          ]}
          onPress={() => onSelectFilter(filter)}
        >
          <Text
            style={[
              styles.buttonText,
              activeFilter === filter && styles.activeText,
            ]}
          >
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FilterButtons;

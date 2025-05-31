// src/components/SearchBar/SearchBar.js
import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import styles from './SearchBarStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../styles/AppStyles';

const SearchBar = ({ placeholder = 'Search...', onChangeText, value }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMedium}
        onChangeText={onChangeText}
        value={value}
      />
      <TouchableOpacity style={styles.searchIcon}>
        <Icon name="search-outline" size={24} color={Colors.textMedium} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

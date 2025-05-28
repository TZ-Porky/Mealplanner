import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../styles/AppStyles';

const SelectableOption = ({ label, selected, onPress }) => {
  return (
    <Pressable onPress={onPress} style={[styles.option, selected && styles.selected]}>
      {selected && <Ionicons name="checkmark-circle" size={24} color={Colors.primaryOrange} />}
      {!selected && <Ionicons name="ellipse-outline" size={24} color={Colors.primaryOrange} />}
      <Text style={[styles.text]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  option: {
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 8,
    marginHorizontal: 5,
  },
  selected: {
    backgroundColor: Colors.blankBackground,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: '#444',
  },
  textSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SelectableOption;

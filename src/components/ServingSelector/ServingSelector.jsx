import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './ServingSelectorStyles';
import { Fonts } from '../../styles/AppStyles';

const ServingsSelector = ({ servings, onIncrease, onDecrease }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onDecrease} style={styles.button}>
        <Icon name="remove-circle-outline" size={Fonts.sizes.large} style={styles.buttonIcon} />
      </TouchableOpacity>
      <Text style={styles.servingsCount}>{servings}</Text>
      <TouchableOpacity onPress={onIncrease} style={styles.button}>
        <Icon name="add-circle-outline" size={Fonts.sizes.large} style={styles.buttonIcon} />
      </TouchableOpacity>
      <Text style={styles.text}>People</Text>
    </View>
  );
};

export default ServingsSelector;

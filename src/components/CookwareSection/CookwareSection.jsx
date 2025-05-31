// src/components/CookwareSection/CookwareSection.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from './CookwareSectionStyles';
import { Colors, Layout } from '../../styles/AppStyles';

const CookwareSection = ({ cookwareList }) => {
  const totalCost = cookwareList.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <View>
      {cookwareList.map((item, index) => (
        <View key={item.id} style={[styles.row, index === cookwareList.length - 1 && styles.lastRow]}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.quantity}</Text>
          <Text style={styles.text}>{item.price} XCFA</Text>
        </View>
      ))}
      <View style={[styles.row, styles.lastRow, { marginTop: Layout.spacing.medium }]}>
        <Text style={styles.totalText}>Total (Optional)</Text>
        <Text style={[styles.totalText, { color: Colors.primaryOrange }]}>{totalCost} XCFA</Text>
      </View>
    </View>
  );
};

export default CookwareSection;

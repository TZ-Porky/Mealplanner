import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './MarketHeaderStyles';
import { Fonts } from '../../styles/AppStyles';

const MarketHeader = ({ title = 'Market', onMenuPress, onNotificationsPress, onCartPress, onAddPress }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
          <Icon name="menu" size={Fonts.sizes.xxLarge} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.rightSection}>
        <TouchableOpacity onPress={onAddPress} style={styles.iconButton}>
          <Icon name="add-outline" size={Fonts.sizes.large} style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onNotificationsPress} style={styles.iconButton}>
          <Icon name="notifications-outline" size={Fonts.sizes.large} style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onCartPress} style={styles.iconButton}>
          <Icon name="cart-outline" size={Fonts.sizes.large} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MarketHeader;

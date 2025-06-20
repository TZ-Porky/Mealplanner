import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Assurez-vous d'avoir installé react-native-vector-icons
import styles from './MarketHeaderStyles';
import { Fonts } from '../../styles/AppStyles';

const MarketHeader = ({ onMenuPress, onNotificationsPress, onCartPress }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
          <Icon name="menu" size={Fonts.sizes.xxLarge} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Market</Text>
      </View>
      <View style={styles.rightSection}>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
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

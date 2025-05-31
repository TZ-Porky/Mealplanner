// src/components/Header/Header.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './HeaderStyle';
import Icon from 'react-native-vector-icons/Ionicons'; // <-- Importez Ionicons

const Header = ({ title = 'Home' }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <TouchableOpacity style={styles.menuButton}>
          {/* Remplacement de l'Image par Icon */}
          <Icon name="menu" size={24} color={styles.pageTitle.color} /> {/* Utilisez une taille et couleur appropriées */}
        </TouchableOpacity>
        <Text style={styles.pageTitle}>{title}</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.iconButton}>
          {/* Remplacement de l'Image par Icon */}
          <Icon name="notifications-outline" size={24} color={styles.pageTitle.color} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          {/* Remplacement de l'Image par Icon */}
          <Icon name="cart-outline" size={24} color={styles.pageTitle.color} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

// src/components/Header/Header.js
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './HeaderStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import AuthServices from '../../services/AuthServices';

const Header = ({ title = 'Home' }) => {
  
  // Instance de navigation
  const navigation = useNavigation();

  // Gestionnaire de déconnexion
  const handleLogout = async () => {
    try {
      AuthServices.signOut();
      Alert.alert('Déconnexion', 'Vous avez été déconnecté avec succès.');
      navigation.replace('/'); // Naviguez vers l'écran SplashScreen
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la déconnexion.');
    }
  };

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
        <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
          {/* Remplacement de l'Image par Icon */}
          <Icon name="log-out-outline" size={24} color={styles.pageTitle.color} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

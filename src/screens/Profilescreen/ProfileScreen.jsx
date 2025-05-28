import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../styles/AppStyles';

const ProfileScreen = () => {

  // ----------------------------------------------------------------------------------//
  // Données Tests
  const userData = {
    fullName: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    registrationDate: '15 janvier 2024',
    generatedRecipes: 12,
    stockedIngredients: 55,
    contributions: 30,
  };
  // ----------------------------------------------------------------------------------//

  // ----------------------------------------------------------------------------------//
  // Fonctions
  const handleLogout = () => {
    // Logique de déconnexion ici
    console.log('Déconnexion');
    // navigation.navigate('Login'); // Exemple de navigation vers l'écran de connexion
  };

  const handleDeleteData = () => {
    // Logique de suppression des données ici (avec confirmation !)
    console.warn('Supprimer toutes les données (implémenter la confirmation)');
  };

  const handleCloseAccount = () => {
    // Logique de fermeture du compte ici (avec confirmation !)
    console.warn('Fermer le compte (implémenter la confirmation)');
  };
  // ----------------------------------------------------------------------------------//

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* En-tête */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil Utilisateur</Text>
        </View>

        {/* Informations de l'utilisateur */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de l'utilisateur</Text>
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={20} color={Colors.textMedium} style={styles.icon} />
            <Text style={styles.infoText}>Nom complet : {userData.fullName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color={Colors.textMedium} style={styles.icon} />
            <Text style={styles.infoText}>Adresse E-mail : {userData.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color={Colors.textMedium} style={styles.icon} />
            <Text style={styles.infoText}>Date d'inscription : {userData.registrationDate}</Text>
          </View>
        </View>

        {/* Statistiques de l'utilisateur */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistiques de l'utilisateur</Text>
          <View style={styles.infoRow}>
            <Ionicons name="receipt-outline" size={20} color={Colors.textMedium} style={styles.icon} />
            <Text style={styles.infoText}>Recettes générées : {userData.generatedRecipes}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="cube-outline" size={20} color={Colors.textMedium} style={styles.icon} />
            <Text style={styles.infoText}>Ingrédients en stock : {userData.stockedIngredients}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="hand-left-outline" size={20} color={Colors.textMedium} style={styles.icon} />
            <Text style={styles.infoText}>Nombre de contributions : {userData.contributions}</Text>
          </View>
        </View>

        {/* Options de gestion du compte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gestion du compte</Text>
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="person-circle-outline" size={20} color={Colors.textDark} style={styles.icon} />
            <Text style={styles.optionText}>Modifier les informations personnelles</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={Colors.textMedium} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="people-outline" size={20} color={Colors.textDark} style={styles.icon} />
            <Text style={styles.optionText}>Informations de la famille</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={Colors.textMedium} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="location-outline" size={20} color={Colors.textDark} style={styles.icon} />
            <Text style={styles.optionText}>Localisation</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={Colors.textMedium} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="shield-outline" size={20} color={Colors.textDark} style={styles.icon} />
            <Text style={styles.optionText}>Authentification</Text>
            <Ionicons name="chevron-forward-outline" size={20} color={Colors.textMedium} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color={Colors.textDark} style={styles.icon} />
            <Text style={styles.optionText}>Déconnexion</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.destructiveOption} onPress={handleDeleteData}>
            <Ionicons name="trash-outline" size={20} color={'red'} style={styles.icon} />
            <Text style={[styles.optionText, { color: 'red' }]}>Supprimer toutes les données</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.destructiveOption} onPress={handleCloseAccount}>
            <Ionicons name="close-circle-outline" size={20} color={'red'} style={styles.icon} />
            <Text style={[styles.optionText, { color: 'red' }]}>Fermer le compte</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textDark,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.textDark,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: Colors.textMedium,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    color: Colors.textDark,
    flex: 1,
  },
  destructiveOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
  },
});

export default ProfileScreen;

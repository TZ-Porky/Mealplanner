/* eslint-disable react-native/no-inline-styles */
// ============================================================== //
/*                          SETUP STEP 1                          */
// ============================================================== //
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
// -------------------------------------------------------------- //
import styles from './StepStyle';
import Button from '../../components/common/Button';
import SelectableOption from '../../components/common/SelectableOption';
import AuthServices from '../../services/AuthServices';
// ============================================================== //

const StepAboutYourself = () => {
  // ------------------------------------------------------------------ //
  // Fonctions

  // Instance de navigation
  const navigation = useNavigation();

  const [currentUser, setCurrentUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [nationality, setNationality] = useState('');
  const [countryName, setCountryName] = useState('');
  const [jobName, setJobName] = useState('');
  const [gender, setGender] = useState('Male');

  useEffect(() => {
    // Charger les infos actuelles de l'utilisateur pour pré-remplir le formulaire
    const loadCurrentUser = async () => {
      const user = await AuthServices.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        // Pré-remplir les champs si les données existent déjà
        setFullName(user.fullName || '');
        setPhoneNumber(user.phoneNumber || '');
        setAge(user.age ? String(user.age) : '');
        setJobName(user.activiteProfessionnelle || '');
        setGender(user.sexe || '');
        setNationality(user.nationalite || '');
        setCountryName(user.paysResidence || '');
      } else {
        // Rediriger si aucun utilisateur n'est connecté
        Alert.alert('Erreur', 'Aucun utilisateur connecté pour compléter le profil.');
        navigation.navigate('SignIn');
      }
    };
    loadCurrentUser();
  }, [navigation]);

  // Gère la complétion du profile.
  const handleCompleteProfile = async () => {
    if (!currentUser) {return;} // S'assurer qu'il y a un utilisateur
    try {
      const updates = {
        fullName,
        phoneNumber: phoneNumber || null,
        age: age ? parseInt(age, 10) : null,
        sexe: gender || null,
        activiteProfessionnelle: jobName || null,
        nationalite: nationality || null,
        paysResidence: countryName || null,
        allergies: [],
      };

      await AuthServices.updateUserInfo(currentUser.uid, updates);
      console.log('Profil mis à jour avec succès :', updates);
      navigation.navigate('SetupStep2');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de mettre à jour le profil: ' + error.message);
    }
  };

  if (!currentUser) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement du profil...</Text>
      </View>
    );
  }

  // ------------------------------------------------------------------ //

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          {/* ===================== | Step Bars |======================= */}
          <View style={styles.stepBarContainer}>
            <View style={[styles.stepBar, { opacity: 1 }]} />
            <View style={[styles.stepBar, { opacity: 0.3 }]} />
            <View style={[styles.stepBar, { opacity: 0.3 }]} />
            <View style={[styles.stepBar, { opacity: 0.3 }]} />
          </View>
          {/* ================================================================== */}
          <Text style={styles.title}>About YourSelf</Text>
          <Text style={styles.subtitle}>Who are you ?</Text>
        </View>
        <View style={styles.body}>
          {/* ===================== | Fields Forms |======================= */}
          <View style={styles.fieldsets}>
            {/* ===================== | Full Name Section |======================= */}
            <View style={styles.field}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person"
                  size={24}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Entrer Full Name"
                  style={styles.input}
                  keyboardType="default"
                  autoCapitalize="none"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            </View>
            {/* ===================== | Phone Number Section |======================= */}
            <View style={styles.field}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="call"
                  size={24}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Entrer Phone Number"
                  style={styles.input}
                  keyboardType="numbers"
                  autoCapitalize="none"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>
            </View>
            {/* ===================== | Age Section |======================= */}
            <View style={styles.field}>
              <Text style={styles.label}>Age</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="calendar"
                  size={24}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Enter Your Age"
                  style={styles.input}
                  keyboardType="numbers-and-punctuation"
                  autoCapitalize="none"
                  value={age}
                  onChangeText={setAge}
                />
              </View>
            </View>
            {/* ===================== | Job Section |======================= */}
            <View style={styles.field}>
              <Text style={styles.label}>Profession</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="briefcase"
                  size={24}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Enter Profession Name"
                  style={styles.input}
                  keyboardType="numbers"
                  autoCapitalize="none"
                  value={jobName}
                  onChangeText={setJobName}
                />
              </View>
            </View>
            {/* ===================== | Gender Section |======================= */}
            <View style={styles.field}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.buttonContainer}>
                <SelectableOption label={'Male'} selected={gender === 'Male'} onPress={() => setGender('Male')}/>
                <SelectableOption label={'Female'} selected={gender === 'Female'} onPress={() => setGender('Female')}/>
              </View>
            </View>
            {/* ===================== | Nationality Section |======================= */}
            <View style={styles.field}>
              <Text style={styles.label}>Nationality</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="flag"
                  size={24}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Enter Your Nationality"
                  style={styles.input}
                  keyboardType="default"
                  autoCapitalize="words"
                  value={nationality}
                  onChangeText={setNationality}
                />
              </View>
            </View>
            {/* ===================== | Country Section |======================= */}
            <View style={styles.field}>
              <Text style={styles.label}>Country Name</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="globe"
                  size={24}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Enter Country Name"
                  style={styles.input}
                  keyboardType="default"
                  autoCapitalize="words"
                  value={countryName}
                  onChangeText={setCountryName}
                />
              </View>
            </View>
            {/* ================================================================== */}
            <View style={styles.buttonContainer}>
              <Button
                title={'Next'}
                onPress={handleCompleteProfile}
                buttonStyle={{flex: 3}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default StepAboutYourself;

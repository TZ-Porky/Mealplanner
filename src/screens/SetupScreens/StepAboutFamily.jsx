/* eslint-disable react-native/no-inline-styles */
// ============================================================== //
/*                          SETUP STEP 2                          */
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
import React, {useState, useEffect} from 'react';
// -------------------------------------------------------------- //
import styles from './StepStyle';
import Button from '../../components/common/Button';
import SelectableOption from '../../components/common/SelectableOption';
import AuthServices from '../../services/AuthServices';
// ============================================================== //

const InputWithIcon = ({icon, ...props}) => (
  <View style={styles.inputContainer}>
    <Ionicons name={icon} size={24} color="#888" style={styles.icon} />
    <TextInput style={styles.input} {...props} />
  </View>
);

const StepAboutFamily = () => {
  // ------------------------------------------------------------------ //
  // Fonctions

  const navigation = useNavigation();

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedFamilyOption, setSelectedFamilyOption] = useState('Yes');
  const [selectedBabyOption, setSelectedBabyOption] = useState('No');

  const [familyMembers, setFamilyMembers] = useState('');
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');

  useEffect(() => {
    // Charger les infos actuelles de l'utilisateur pour pré-remplir le formulaire
    const loadCurrentUserAndData = async () => {
      setLoading(true);
      const user = await AuthServices.getCurrentUser();
      if (user) {
        setCurrentUser(user);

        if (user.situationFamiliale) {
          setSelectedFamilyOption(user.situationFamiliale.vieEnFamille ? 'Yes' : 'No');
          if (user.situationFamiliale.vieEnFamille) {
            setFamilyMembers(user.situationFamiliale.nombreMembres ? String(user.situationFamiliale.nombreMembres) : '');
            setAdults(user.situationFamiliale.nombreAdultes ? String(user.situationFamiliale.nombreAdultes) : '');
            setChildren(user.situationFamiliale.nombreEnfants ? String(user.situationFamiliale.nombreEnfants) : '');
            setSelectedBabyOption(user.situationFamiliale.bebePresent ? 'Yes' : 'No');
          }
        }
      } else {
        // Rediriger si aucun utilisateur n'est connecté
        Alert.alert('Erreur', 'Aucun utilisateur connecté.');
        navigation.replace('SignIn'); // ou 'SignUp'
      }
      setLoading(false);
    };
    loadCurrentUserAndData();
  }, [navigation]);

  const handleNavigation = async () => {
    if (!currentUser) {
      Alert.alert('Erreur', 'Utilisateur non connecté.');
      return;
    }

    if (selectedFamilyOption === 'Yes') {
      const totalMembers = parseInt(adults || '0', 10) + parseInt(children || '0', 10);
      if (totalMembers > parseInt(familyMembers || '0', 10)) {
        Alert.alert('Erreur', 'Le nombre total d\'adultes et d\'enfants est incohérent avec le nombre de membres de la famille.');
        return;
      }

      // Valider que tous les champs requis sont remplis
      if (!familyMembers || !adults || !children) {
        Alert.alert('Erreur', 'Veuillez remplir tous les champs de la famille.');
        return;
      }
    }

    setLoading(true);
    try {
      const updates = {
        situationFamiliale: {
          vieEnFamille: selectedFamilyOption === 'Yes',
          nombreMembres: selectedFamilyOption === 'Yes' ? parseInt(familyMembers || '0', 10) : null,
          nombreAdultes: selectedFamilyOption === 'Yes' ? parseInt(adults || '0', 10) : null,
          nombreEnfants: selectedFamilyOption === 'Yes' ? parseInt(children || '0', 10) : null,
          bebePresent: selectedFamilyOption === 'Yes' ? selectedBabyOption === 'Yes' : null,
        },
      };

      await AuthServices.updateUserInfo(currentUser.uid, updates);
      console.log('Informations familiales mises à jour avec succès :', updates);
      navigation.navigate('SetupStep3'); // Navigue vers l'étape suivante
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de mettre à jour les informations familiales: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackNavigation = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement des informations familiales...</Text>
      </View>
    );
  }
  // ------------------------------------------------------------------ //

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          {/* ===================== | Step Bars |======================= */}
          <View style={styles.stepBarContainer}>
            <View style={[styles.stepBar, {opacity: 0.3}]} />
            <View style={[styles.stepBar, {opacity: 1}]} />
            <View style={[styles.stepBar, {opacity: 0.3}]} />
            <View style={[styles.stepBar, {opacity: 0.3}]} />
          </View>
          {/* ================================================================== */}
          <Text style={styles.title}>About Your Family</Text>
          <Text style={styles.subtitle}>
            Who are the members of your family?
          </Text>
        </View>
        <View style={styles.body}>
          {/* ===================== | Fields Forms |======================= */}
          <View style={styles.fieldsets}>
            {/* ===================== | Family? Section |======================= */}
            <View style={styles.field}>
              <Text style={styles.label}>Do you live with your Family?</Text>
              <View style={styles.buttonContainer}>
                <SelectableOption
                  label={'Yes'}
                  selected={selectedFamilyOption === 'Yes'}
                  onPress={() => setSelectedFamilyOption('Yes')}
                />
                <SelectableOption
                  label={'No'}
                  selected={selectedFamilyOption === 'No'}
                  onPress={() => setSelectedFamilyOption('No')}
                />
              </View>
            </View>
            {selectedFamilyOption === 'Yes' && (
              <>
                {/* ===================== | Members Section |======================= */}
                <View style={styles.field}>
                  <Text style={styles.label}>Number of Members</Text>
                  <InputWithIcon
                    icon="people"
                    placeholder="Number of Members"
                    value={familyMembers}
                    onChangeText={setFamilyMembers}
                    keyboardType="number-pad"
                  />
                </View>
                {/* ===================== | Adults Section |======================= */}
                <View style={styles.field}>
                  <Text style={styles.label}>Number of Adults</Text>
                  <InputWithIcon
                    icon="person"
                    placeholder="Number of adults"
                    value={adults}
                    onChangeText={setAdults}
                    keyboardType="number-pad"
                  />
                </View>
                {/* ===================== | Childs Section |======================= */}
                <View style={styles.field}>
                  <Text style={styles.label}>Number of Children</Text>
                  <InputWithIcon
                    icon="people"
                    placeholder="Number of Children"
                    value={children}
                    onChangeText={setChildren}
                    keyboardType="number-pad"
                  />
                </View>
                {/* ===================== | Family? Section |======================= */}
                <View style={styles.field}>
                  <Text style={styles.label}>
                    Do you have a baby (or more)?
                  </Text>
                  <View style={styles.buttonContainer}>
                    <SelectableOption
                      label={'Yes'}
                      selected={selectedBabyOption === 'Yes'}
                      onPress={() => setSelectedBabyOption('Yes')}
                    />
                    <SelectableOption
                      label={'No'}
                      selected={selectedBabyOption === 'No'}
                      onPress={() => setSelectedBabyOption('No')}
                    />
                  </View>
                </View>
              </>
            )}
            {/* ================================================================== */}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={'Back'}
            onPress={handleBackNavigation}
            outlined={true}
            buttonStyle={{flex: 1}}
          />
          <Button
            title={'Next'}
            onPress={handleNavigation}
            buttonStyle={{flex: 2}}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default StepAboutFamily;

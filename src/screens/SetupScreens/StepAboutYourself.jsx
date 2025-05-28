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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
// -------------------------------------------------------------- //
import styles from './StepStyle';
import Button from '../../components/common/Button';
import SelectableOption from '../../components/common/SelectableOption';
// ============================================================== //

const StepAboutYourself = () => {
  // ------------------------------------------------------------------ //
  // Fonctions

  const navigation = useNavigation();

  const [selectedOption, setSelectedOption] = useState(false);

  // Redirige vers l'accueil
  const handleNavigation = () => {
    navigation.navigate('SetupStep2');
  };
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
                  keyboardType="numbers-and-punctuation"
                  autoCapitalize="none"
                />
              </View>
            </View>
            {/* ===================== | Gender Section |======================= */}
            <View style={styles.field}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.buttonContainer}>
                <SelectableOption label={'Male'} selected={selectedOption === 'Male'} onPress={() => setSelectedOption('Male')}/>
                <SelectableOption label={'Female'} selected={selectedOption === 'Female'} onPress={() => setSelectedOption('Female')}/>
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
                />
              </View>
            </View>
            {/* ================================================================== */}
            <View style={styles.buttonContainer}>
              <Button
                title={'Next'}
                onPress={handleNavigation}
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

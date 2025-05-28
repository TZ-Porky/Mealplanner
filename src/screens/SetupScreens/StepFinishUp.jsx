/* eslint-disable react-native/no-inline-styles */
// ============================================================== //
/*                          SETUP STEP 3                          */
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
import React, {useState} from 'react';
// -------------------------------------------------------------- //
import styles from './StepStyle';
import Button from '../../components/common/Button';
import SelectableOption from '../../components/common/SelectableOption';
// ============================================================== //

const InputWithIcon = ({icon, subtext = '', ...props}) => (
  <View style={styles.inputContainer}>
    <Ionicons name={icon} size={24} color="#888" style={styles.icon} />
    <TextInput style={styles.input} {...props} />
    <Text style={styles.label}>{subtext}</Text>
  </View>
);

const StepFinishUp = () => {
  // ------------------------------------------------------------------ //
  // Fonctions

  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.replace('Main', {screen: 'Home'});
  };

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
            <View style={[styles.stepBar, {opacity: 0.3}]} />
            <View style={[styles.stepBar, {opacity: 0.3}]} />
            <View style={[styles.stepBar, {opacity: 1}]} />
          </View>
          {/* ================================================================== */}
          <Text style={styles.title}>Finish Up</Text>
          <Text style={styles.subtitle}>All sets ! Enjoy our App!</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.main}>Register Complete!</Text>
          <Text style={styles.mainText}>
            All the parameters have been sets. You can always modify them later
            if you want.{'\n\n'} Go to “Options” &gt; “Personal Informations” &gt;
            “Modify my Informations”.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={'Finish'}
            onPress={handleNavigation}
            buttonStyle={{flex: 2}}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default StepFinishUp;

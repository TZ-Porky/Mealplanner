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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react';
// -------------------------------------------------------------- //
import styles from './StepStyle';
import Button from '../../components/common/Button';
import SelectableOption from '../../components/common/SelectableOption';
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

  const [selectedFamilyOption, setSelectedFamilyOption] = useState(true);
  const [selectedBabyOption, setSelectedBabyOption] = useState(true);

  const [familyMembers, setFamilyMembers] = useState('');
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');

  const handleNavigation = () => {
    if (parseInt(adults) + parseInt(children) > parseInt(familyMembers)) {
      Alert.alert('Error', 'Members count is inconsistent');
      return;
    }

    navigation.navigate('SetupStep3');
  };

  const handleBackNavigation = () => {
    navigation.goBack();
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

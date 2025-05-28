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

const StepAboutMeals = () => {
  // ------------------------------------------------------------------ //
  // Fonctions

  const navigation = useNavigation();

  const [selectedMealOption, setSelectedMealOption] = useState(true);
  const [selectedMealFrequencyOption, setSelectedMealFrequencyOption] = useState(true);

  const [mealName, setMealName] = useState('');
  const [consumeDate, setConsumeDate] = useState('');
  const [portions, setPortions] = useState('');
  const [mealPrice, setMealPrice] = useState('');

  const handleNavigation = () => {
    navigation.navigate('SetupStep4');
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
            <View style={[styles.stepBar, {opacity: 0.3}]} />
            <View style={[styles.stepBar, {opacity: 1}]} />
            <View style={[styles.stepBar, {opacity: 0.3}]} />
          </View>
          {/* ================================================================== */}
          <Text style={styles.title}>About Your Meals</Text>
          <Text style={styles.subtitle}>What do you like to eat?</Text>
        </View>
        <View style={styles.body}>
          {/* ===================== | Fields Forms |======================= */}
          <View style={styles.fieldsets}>
            {/* ===================== | Meal? Section |======================= */}
            <View style={styles.field}>
              <Text style={styles.label}>Do you have a favorite meal?</Text>
              <View style={styles.buttonContainer}>
                <SelectableOption
                  label={'Yes'}
                  selected={selectedMealOption === 'Yes'}
                  onPress={() => setSelectedMealOption('Yes')}
                />
                <SelectableOption
                  label={'No'}
                  selected={selectedMealOption === 'No'}
                  onPress={() => setSelectedMealOption('No')}
                />
              </View>
            </View>
            {selectedMealOption === 'Yes' && (
              <>
                {/* ===================== | Members Section |======================= */}
                <View style={styles.field}>
                  <Text style={styles.label}>Favorite Meal's Name</Text>
                  <InputWithIcon
                    icon="restaurant"
                    placeholder="Favorite Dish Name"
                    value={mealName}
                    onChangeText={setMealName}
                    keyboardType="default"
                  />
                </View>
                {/* ===================== | Frequency? Section |======================= */}
                <View style={styles.field}>
                  <Text style={styles.label}>How often do you cook?</Text>
                  <View style={styles.buttonContainer}>
                    <SelectableOption
                      label={'Often'}
                      selected={selectedMealFrequencyOption === 'Often'}
                      onPress={() => setSelectedMealFrequencyOption('Often')}
                    />
                    <SelectableOption
                      label={'Sometimes'}
                      selected={selectedMealFrequencyOption === 'Sometimes'}
                      onPress={() =>
                        setSelectedMealFrequencyOption('Sometimes')
                      }
                    />
                  </View>
                </View>
                {/* ===================== | Food Expiration Section |======================= */}
                <View style={styles.field}>
                  <Text style={styles.label}>How long last the meal?</Text>
                  <InputWithIcon
                    icon="calendar"
                    placeholder="Number of days"
                    value={consumeDate}
                    onChangeText={setConsumeDate}
                    keyboardType="number-pad"
                  />
                </View>
                {/* ===================== | Food Quantity Section |======================= */}
                <View style={styles.field}>
                  <Text style={styles.label}>For how many person do you cook?</Text>
                  <InputWithIcon
                    icon="people"
                    placeholder="Number of parts (Max)"
                    value={portions}
                    onChangeText={setPortions}
                    keyboardType="number-pad"
                  />
                </View>
                {/* ===================== | Food Cost Section |======================= */}
                <View style={styles.field}>
                  <Text style={styles.label}>How much cost the meal to cook?</Text>
                  <InputWithIcon
                    icon="wallet"
                    subtext="XCFA"
                    placeholder="Cost of the meal"
                    value={mealPrice}
                    onChangeText={setMealPrice}
                    keyboardType="number-pad"
                  />
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

export default StepAboutMeals;

/* eslint-disable react-native/no-inline-styles */
// ============================================================== //
/*                      INSCRIPTION SCREEN                        */
// ============================================================== //
import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import styles from './InscriptionScreenStyle';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// -------------------------------------------------------------- //
import FacebookLogo from '../../../assets/icons/facebook-color.svg';
import GoogleLogo from '../../../assets/icons/google.svg';
import Button from '../../components/common/Button';
// -------------------------------------------------------------- //

const InscriptionScreen = () => {
  // -------------------------------------------------------------- //
  // Variables

  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  // -------------------------------------------------------------- //
  // Fonctions

  // Redirige vers le formulaire d'inscription
  const handleNavigationSetupForm = () => {
    navigation.replace('Setup', {screen: 'SetupStep1'});
  };

  // Redirige vers la page connexion
  const handleNavigationConnexion = () => {
    navigation.replace('SignIn');
  };
  // -------------------------------------------------------------- //

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.preHeader}> Sign Up </Text>
        <Text style={styles.p}>Just a few quick things to get started</Text>
      </View>

      <View style={styles.fieldsets}>
        <View style={styles.field}>
          <Text style={styles.label}>Email Adress</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail" size={24} color="#888" style={styles.icon} />
            <TextInput
              placeholder="Entrer Email Address"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed"
              size={24}
              color="#888"
              style={styles.icon}
            />
            <TextInput
              placeholder="Enter Password"
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed"
              size={24}
              color="#888"
              style={styles.icon}
            />
            <TextInput
              placeholder="Re-enter Password"
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>
        </View>

        <Button
          title={'Sign Up'}
          size="medium"
          onPress={handleNavigationSetupForm}
          buttonStyle={{
            minWidth: 100,
            maxWidth: 300,
            alignSelf: 'strech',
            marginLeft: 10,
          }}
        />
        <Text style={styles.pAuth}>Sign Up with:</Text>
        <View style={styles.row}>
          <TouchableOpacity>
            <GoogleLogo width={40} height={40} />
          </TouchableOpacity>

          <TouchableOpacity>
            <FacebookLogo width={40} height={40} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rowAuth}>
        <Text style={styles.subtitle}>Already have an account ?</Text>
        <TouchableOpacity onPress={handleNavigationConnexion}>
          <Text style={styles.power}> Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InscriptionScreen;

/* eslint-disable react-native/no-inline-styles */
// ============================================================== //
/*                        CONNEXION SCREEN                        */
// ============================================================== //
import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// -------------------------------------------------------------- //
import FacebookLogo from '../../../assets/icons/facebook-color.svg';
import GoogleLogo from '../../../assets/icons/google.svg';
import Button from '../../components/common/Button';
import styles from './ConnexionScreenStyle';
// ============================================================== //

const ConnexionScreen = () => {
  // ------------------------------------------------------------ //
  // ! Variables

  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  // ------------------------------------------------------------ //
  // ! Fonctions

  // Redirige vers l'accueil
  const handleNavigationHome = () => {
    navigation.replace('Main', {screen: 'Home'});
  };

  // Redirige vers la page d'inscription
  const handleNavigationInscription = () => {
    navigation.replace('SignUp');
  };
  // ------------------------------------------------------------ //

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.preHeader}> Sign In </Text>
        <Text style={styles.p}>Welcome back you've been missed</Text>
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
        <TouchableOpacity>
          <Text style={styles.pPassword}>Forgot Password</Text>
        </TouchableOpacity>
        <Button
          title={'Sign In'}
          size="medium"
          onPress={handleNavigationHome}
          buttonStyle={{
            minWidth: 100,
            maxWidth: 300,
            alignSelf: 'strech',
            marginLeft: 10,
          }}
        />
        <Text style={styles.pAuth}>Sign in with:</Text>
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
        <Text style={styles.subtitle}>Don't have an account ?</Text>
        <TouchableOpacity onPress={handleNavigationInscription}>
          <Text style={styles.power}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConnexionScreen;

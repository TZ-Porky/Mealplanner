/* eslint-disable react-native/no-inline-styles */
// -------------------------------------------------------------- //
import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from './LandingScreenStyle';
import Button from '../../components/common/Button';
import FacebookLogo from '../../../assets/icons/facebook-color.svg';
import GoogleLogo from '../../../assets/icons/google.svg';
// -------------------------------------------------------------- //

const LandingScreen = () => {
  // -------------------------------------------------------------- //
  // Fonctions

  // Crée une instance de navigation
  const navigation = useNavigation();

  // Gère la navigation vers l'écran d'authentification
  const handleNavigationConnexion = () => {
    navigation.navigate('SignIn');
  };

  const handleNavigationInscription = () => {
    navigation.navigate('SignUp');
  };
  // -------------------------------------------------------------- //

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/fond1.jpg')}
        style={styles.coverImage}
      />
      <View style={styles.downContainer}>
        <Text style={styles.h1}>Welcome !</Text>
        <Text style={styles.p}>
          Welcome to our powered by IA meal planner App ! Before you proceed
          with the application, you should identify yourself first.
        </Text>

        <Button
          title={'Sign In'}
          onPress={handleNavigationConnexion}
          buttonStyle={{minWidth: 100, maxWidth: 300, alignSelf: 'strech', marginLeft: 10}}
        />
        <TouchableOpacity onPress={handleNavigationInscription}>
          <Text style={styles.link}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
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
    </View>
  );
};

export default LandingScreen;

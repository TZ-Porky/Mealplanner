// -------------------------------------------------------------- //
import {View, Text, Image} from 'react-native';
import React from 'react';
import {  useNavigation } from '@react-navigation/native';
// -------------------------------------------------------------- //

const LandingScreen = () => {
  // -------------------------------------------------------------- //
  // Fonctions

  // Crée une instance de navigation
  const navigation = useNavigation();

  // Gère la navigation vers l'écran d'authentification
  const handleNavigation = () => {
    navigation.navigate('Connexion');
  };
  // -------------------------------------------------------------- //

  return (
    <View>
      <View>
        <Image source={require('../../assets/images/Logo.png')}/>
        <Text>Bienvenue</Text>
        <Text>
            Laissez-vous guider par notre assistant culinaire hors-pair et concevoir
            de magnifique gâterie culinaire.
        </Text>
      </View>
    </View>
  );
};

export default LandingScreen;

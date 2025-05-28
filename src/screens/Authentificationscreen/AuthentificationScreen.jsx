// ------------------------------------------------------------------ //
import {View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from './AuthentificationScreenStyle';
import Button from '../../components/common/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../styles/AppStyles';

// ------------------------------------------------------------------ //

const AuthentificationScreen = () => {
  // ------------------------------------------------------------------ //
  // Fonctions

  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);


  // Redirige vers l'accueil
  const handleNavigation = () => {
    navigation.navigate('Home');
  };
  // ------------------------------------------------------------------ //

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <View style={styles.panel}>
            <Text style={styles.title}>Bienvenue</Text>
            <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>
          </View>
        </View>
        <View style={styles.content}>

          {isLogin ? (
          <>
              <View style={styles.fieldsets}>

              <View style={styles.field}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="mail" size={24} color="#888" style={styles.icon} />
                  <TextInput
                    placeholder="Entrer votre adresse e-mail"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Mot de passe</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed" size={24} color="#888" style={styles.icon} />
                  <TextInput
                    placeholder="Entrer votre mot de passe"
                    secureTextEntry={!showPassword}
                    style={styles.input}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#888" />
                  </TouchableOpacity>
                </View>
              </View>

            </View>

            <Button title={'Connexion'} style={{ marginTop: 20 }} />
          </>
          ) : (

            <>
              <View style={styles.fieldsets}>
                <View style={styles.field}>
                  <Text style={styles.label}>Nom</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="person" size={24} color="#888" style={styles.icon} />
                    <TextInput
                      placeholder="Entrer votre nom"
                      style={styles.input}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="mail" size={24} color="#888" style={styles.icon} />
                    <TextInput
                      placeholder="Entrer votre adresse e-mail"
                      style={styles.input}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>Mot de passe</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed" size={24} color="#888" style={styles.icon} />
                    <TextInput
                      placeholder="Entrer votre mot de passe"
                      secureTextEntry={!showPassword}
                      style={styles.input}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#888" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <Button title={'Inscription'} style={{ marginTop: 20 }} />
            </>
          )}

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={{ marginTop: 20 }}>
            <Text style={{ color: Colors.primaryOrange, textAlign: 'center' }}>
              {isLogin ? "Pas encore inscrit ? Créez un compte" : "Déjà un compte ? Connectez-vous"}
            </Text>
          </TouchableOpacity>


        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthentificationScreen;

/*
*/

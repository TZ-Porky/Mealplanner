import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../screens/ConnexionScreenStyle';
import Button from '../components/Button';

export default function ConnexionForm( {onChange, onSubmit}) {
  return (
    <>
      <View style={styles.StarterMessageContainer}>
        <Text style={styles.h1}>Bienvenue</Text>
        <Text style={styles.p}>Ravi de vous revoir</Text>
      </View>
      <View>
        <View style={styles.HoverContainer}>
          <Text>Adresse e-mail: </Text>
          <TextInput
            style={styles.Fields}
            placeholder="Entrer votre adresse e-mail..."
          />
          <Text>Mot de passe: </Text>
          <TextInput
            style={styles.Fields}
            placeholder="Entrer votre mot de passe..."
          />
          <Button title={'Connexion'} onPress={onSubmit}/>
          <TouchableOpacity onPress={onChange}>
            <Text style={styles.Password}>Je n'ai pas de compte </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

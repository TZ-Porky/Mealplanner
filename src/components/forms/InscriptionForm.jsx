import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../screens/ConnexionScreenStyle';
import Button from './Button';

export default function InscriptionForm({onChange, onSubmit}) {
  return (
    <>
      <View style={styles.StarterMessageContainer}>
        <Text style={styles.h1}>Bienvenue</Text>
        <Text style={styles.p}>Ravi de vous accueillir parmi nous</Text>
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
          <Text>Confirmer le mot de passe: </Text>
          <TextInput
            style={styles.Fields}
            placeholder="Entrer votre mot de passe..."
          />
          <Button title={'Inscription'} outlined={true} onPress={onSubmit}/>
          <TouchableOpacity onPress={onChange}>
            <Text style={styles.Password}>J'ai déjà un compte </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

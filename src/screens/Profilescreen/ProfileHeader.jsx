import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './ProfileScreenStyle';
import { COLORS } from './ProfileColors';

export default function ProfileHeader({
  user, photoBase64, handlePickPhoto, darkMode
}) {
  return (
    <View style={[styles.card, darkMode && { backgroundColor: COLORS.DARK_CARD }]}>
      {/* Photo en haut */}
      <TouchableOpacity onPress={handlePickPhoto} style={{ alignItems: 'center', marginBottom: 10 }}>
        <Image
          source={
            photoBase64
              ? { uri: `data:image/jpeg;base64,${photoBase64}` }
              : user?.photoURL
              ? { uri: user.photoURL }
              : { uri: 'https://ui-avatars.com/api/?name=Profil' }
          }
          style={styles.avatar}
        />
        <Text style={[styles.editPhoto, darkMode && { color: COLORS.ORANGE }]}>Changer la photo</Text>
      </TouchableOpacity>
      {/* Affichage du nom sans édition */}
      <Text style={[styles.name, darkMode && { color: COLORS.ORANGE }]}>
        {user?.displayName || 'Nom inconnu'}
      </Text>
      <Text style={[styles.email, darkMode && { color: COLORS.DARK_GRAY }]}>
        {user?.email}
      </Text>
      </View>
  );
}
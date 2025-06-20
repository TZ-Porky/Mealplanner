import React, { useEffect, useState } from 'react';
import { ScrollView, View, ActivityIndicator, Text, Alert, Linking } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from './ProfileScreenStyle';
import { COLORS } from './ProfileColors';

import ProfileHeader from './ProfileHeader';
import ProfileHistory from './ProfileHistory';
import ProfileFamily from './ProfileFamily';
import ProfileNotifications from './ProfileNotifications';
import ProfileAppearance from './ProfileAppearance';
import ProfileBugReport from './ProfileBugReport';

// Import du modèle MembreFamille
import MembreFamille from '../../models/MembreFamille';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photoBase64, setPhotoBase64] = useState(null);
  const [history, setHistory] = useState([]);
  const [family, setFamily] = useState([]);
  // Champs famille selon l'ordre du modèle
  const [newMemberFullName, setNewMemberFullName] = useState('');
  const [newMemberAge, setNewMemberAge] = useState('');
  const [newMemberSexe, setNewMemberSexe] = useState('');
  const [newMemberAllergies, setNewMemberAllergies] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [bugReport, setBugReport] = useState('');

  const [profileData, setProfileData] = useState({
    fullName: '',
    age: '',
    sexe: '',
    email: '',
    phoneNumber: '',
    nationalite: '',
    paysResidence: '',
    activiteProfessionnelle: '',
    allergies: [],
  });
  const [editingProfile, setEditingProfile] = useState(false);

  useEffect(() => {
    const currentUser = auth().currentUser;
    setUser(currentUser);

    if (!currentUser) {
      setLoading(false);
      return;
    }

    firestore()
      .collection('users')
      .doc(currentUser.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          if (doc.data().photoBase64) setPhotoBase64(doc.data().photoBase64);
          if (doc.data().notificationsEnabled !== undefined) setNotificationsEnabled(doc.data().notificationsEnabled);
          if (doc.data().darkMode !== undefined) setDarkMode(doc.data().darkMode);

          setProfileData({
            fullName: doc.data().fullName || '',
            age: doc.data().age ? doc.data().age.toString() : '',
            sexe: doc.data().sexe || '',
            email: doc.data().email || currentUser.email || '',
            phoneNumber: doc.data().phoneNumber || '',
            nationalite: doc.data().nationalite || '',
            paysResidence: doc.data().paysResidence || '',
            activiteProfessionnelle: doc.data().activiteProfessionnelle || '',
            allergies: Array.isArray(doc.data().allergies)
              ? doc.data().allergies
              : (doc.data().allergies ? doc.data().allergies.split(',').map(a => a.trim()) : []),
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    const unsubscribeHistory = firestore()
      .collection('history')
      .where('userId', '==', currentUser.uid)
      .orderBy('timestamp', 'desc')
      .limit(20)
      .onSnapshot(
        snapshot => {
          if (snapshot && snapshot.docs) {
            const data = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setHistory(data);
          } else {
            setHistory([]);
          }
        },
        () => setHistory([])
      );

    const unsubscribeFamily = firestore()
      .collection('users')
      .doc(currentUser.uid)
      .collection('family')
      .onSnapshot(snapshot => {
        if (snapshot && snapshot.docs) {
          const data = snapshot.docs.map(doc => {
            const membre = new MembreFamille(
              doc.data().fullName || '',
              doc.data().age || '',
              doc.data().sexe || '',
              doc.data().allergies || []
            );
            membre.id = doc.id;
            return membre;
          });
          setFamily(data);
        } else {
          setFamily([]);
        }
      });

    return () => {
      unsubscribeHistory();
      unsubscribeFamily();
    };
  }, []);

  const handlePickPhoto = async () => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: true, maxWidth: 400, maxHeight: 400 },
      async (response) => {
        if (response.didCancel || response.errorCode) return;
        const base64 = response.assets[0].base64;
        setPhotoBase64(base64);
        await firestore()
          .collection('users')
          .doc(user.uid)
          .set({ photoBase64: base64 }, { merge: true });
        Alert.alert('Photo de profil mise à jour !');
      }
    );
  };

  const handleAddHistory = async () => {
    if (!user) return;
    await firestore().collection('history').add({
      userId: user.uid,
      action: "A généré une recette de test",
      timestamp: Date.now(),
    });
    Alert.alert('Historique ajouté !');
  };

  // Ajout membre famille selon l'ordre du modèle
  const handleAddFamilyMember = async () => {
    if (
      !user ||
      !newMemberFullName.trim() ||
      !newMemberAge.trim() ||
      !newMemberSexe.trim()
    ) {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
      return;
    }
    try {
      const membre = new MembreFamille(
        newMemberFullName.trim(),
        parseInt(newMemberAge, 10),
        newMemberSexe.trim(),
        newMemberAllergies
          ? newMemberAllergies.split(',').map(a => a.trim()).filter(a => a)
          : []
      );
      await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('family')
        .add({
          fullName: membre.fullName,
          age: membre.age,
          sexe: membre.sexe,
          allergies: membre.allergies,
        });
      setNewMemberFullName('');
      setNewMemberAge('');
      setNewMemberSexe('');
      setNewMemberAllergies('');
    } catch (e) {
      console.log('Erreur Firestore:', e);
      Alert.alert('Erreur', "Impossible d'ajouter le membre.");
    }
  };

  const handleDeleteFamilyMember = async (memberId) => {
    if (!user || !memberId) return;
    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('family')
        .doc(memberId)
        .delete();
    } catch (e) {
      Alert.alert('Erreur', "Impossible de supprimer ce membre.");
    }
  };

  const handleToggleNotifications = async () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    if (user) {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({ notificationsEnabled: newValue }, { merge: true });
    }
  };

  const handleToggleDarkMode = async () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    if (user) {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({ darkMode: newValue }, { merge: true });
    }
  };

  const handleSendBugReport = () => {
    if (!bugReport.trim()) return;
    const subject = encodeURIComponent('Bug signalé depuis l\'app');
    const body = encodeURIComponent(bugReport + '\n\nUtilisateur: ' + (user?.email || ''));
    const mailto = `mailto:bryanazebaze9@gmail.com?subject=${subject}&body=${body}`;
    Linking.openURL(mailto);
    setBugReport('');
  };

  const handleSaveProfile = async () => {
    try {
      const dataToSave = {
        ...profileData,
        age: profileData.age ? parseInt(profileData.age, 10) : '',
        allergies: Array.isArray(profileData.allergies)
          ? profileData.allergies.filter(a => a.trim() !== '')
          : (profileData.allergies ? profileData.allergies.split(',').map(a => a.trim()) : []),
      };
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set(dataToSave, { merge: true });
      setProfileData(dataToSave);
      setEditingProfile(false);
      Alert.alert('Profil mis à jour');
    } catch (e) {
      Alert.alert('Erreur', e.message);
    }
  };

  const requiredFields = [
    'fullName', 'age', 'sexe', 'email', 'phoneNumber',
    'nationalite', 'paysResidence', 'activiteProfessionnelle'
  ];
  const filledCount = requiredFields.filter(field => profileData[field] && profileData[field].toString().trim() !== '').length;
  const progress = filledCount / requiredFields.length;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={COLORS.ORANGE} />
        <Text style={{ color: COLORS.ORANGE, marginTop: 10 }}>Chargement du profil...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={{ color: COLORS.ORANGE }}>Aucun utilisateur connecté.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, darkMode && { backgroundColor: COLORS.DARK_BG }]}>
      <ProfileHeader
        user={user}
        photoBase64={photoBase64}
        handlePickPhoto={handlePickPhoto}
        darkMode={darkMode}
      />

     <View style={{ margin: 16 }}>
        <Text style={{ color: darkMode ? '#fff' : '#222' }}>
          Complétion du profil : {Math.round(progress * 100)}%
        </Text>
        <View style={{ height: 10, backgroundColor: '#eee', borderRadius: 5, marginTop: 4 }}>
          <View style={{
            width: `${progress * 100}%`,
            height: 10,
            backgroundColor: progress === 1 ? '#4caf50' : '#ff9800',
            borderRadius: 5
          }} />
        </View>
      </View>
      <ProfileFamily
        family={family}
        newMemberName={newMemberFullName}
        setNewMemberName={setNewMemberFullName}
        newMemberAge={newMemberAge}
        setNewMemberAge={setNewMemberAge}
        newMemberSex={newMemberSexe}
        setNewMemberSex={setNewMemberSexe}
        newMemberAllergies={newMemberAllergies}
        setNewMemberAllergies={setNewMemberAllergies}
        handleAddFamilyMember={handleAddFamilyMember}
        handleDeleteFamilyMember={handleDeleteFamilyMember}
        darkMode={darkMode}
        // Ajout d'une prop pour afficher le select sexe
        showSexeSelect
      />

      <ProfileHistory
        history={history}
        handleAddHistory={handleAddHistory}
        darkMode={darkMode}
      />
      <ProfileNotifications
        notificationsEnabled={notificationsEnabled}
        handleToggleNotifications={handleToggleNotifications}
        darkMode={darkMode}
      />
      <ProfileAppearance
        darkMode={darkMode}
        handleToggleDarkMode={handleToggleDarkMode}
      />
      <ProfileBugReport
        bugReport={bugReport}
        setBugReport={setBugReport}
        handleSendBugReport={handleSendBugReport}
        darkMode={darkMode}
      />
    </ScrollView>
  );
}
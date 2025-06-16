// Service d'authentification et de gestion des utilisateurs
// ========================================================= //
// Ce service utilise Firebase Auth pour l'authentification et Firestore pour stocker les données utilisateur.

import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import Utilisateur from '../models/Utilisateur';

// Configuration Firebase
export const auth = firebase.auth();
export const firestore = firebase.firestore();

class AuthService {

  // Créer un nouvel utilisateur avec email et mot de passe
  async signUp(email, password) {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const { uid } = userCredential.user;

      // Crée une instance minimale de notre modèle Utilisateur
      const newUser = new Utilisateur(
        uid,  // Identifiant
        null, // Nom complet
        email,
        null, // Numéro de téléphone
        null, // Age
        null, // Sexe
        null, // Activité professionnelle
        null, // Nationalité
        null, // Pays de résidence
        []    // Allergies (initialement vide)
      );

      // Sauvegarde les données initiales de l'utilisateur dans Firestore
      await firestore.collection('users').doc(uid).set(this._toPlainObject(newUser));

      return newUser;
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      throw error;
    }
  }

  // Connecte un utilisateur existant avec email et mot de passe
  async signIn(email, password) {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const { uid } = userCredential.user;

      // Récupère les données complètes de l'utilisateur depuis Firestore
      const userDoc = await firestore.collection('users').doc(uid).get();

      if (userDoc.exists) {
        const userData = userDoc.data();

        // Crée une instance d'Utilisateur
        const connectedUser = new Utilisateur(
          uid,
          userData.fullName,
          userData.email,
          userData.phoneNumber,
          userData.age,
          userData.sexe,
          userData.activiteProfessionnelle,
          userData.nationalite,
          userData.paysResidence,
          userData.allergies
        );
        return connectedUser;
      } else {
        // Cela ne devrait pas arriver si signUp a bien fonctionné
        console.warn("Document utilisateur non trouvé dans Firestore pour l'UID :", uid);
        throw new Error('Profil utilisateur introuvable après connexion.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      throw error;
    }
  }

  // Met à jour les informations de l'utilisateur dans Firestore
  async updateUserInfo(uid, updates) {
    try {
      await firestore.collection('users').doc(uid).update(updates);
      console.log("Informations utilisateur mises à jour avec succès pour l'UID:", uid);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations utilisateur :', error);
      throw error;
    }
  }


   //Déconnecte l'utilisateur actuel.
  async signOut() {
    try {
      await auth.signOut();
      console.log('Utilisateur déconnecté.');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
      throw error;
    }
  }

  // Récupère l'utilisateur actuellement connecté
  async getCurrentUser() {
    const firebaseUser = auth.currentUser;
    if (firebaseUser) {
      try {
        const userDoc = await firestore.collection('users').doc(firebaseUser.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          // Crée une instance d'Utilisateur avec les données récupérées
          return new Utilisateur(
            firebaseUser.uid,
            userData.fullName,
            userData.email,
            userData.phoneNumber,
            userData.age,
            userData.sexe,
            userData.activiteProfessionnelle,
            userData.nationalite,
            userData.paysResidence,
            userData.allergies
          );
        } else {
          // Si l'utilisateur est authentifié mais son document Firestore n'existe pas (cas rare mais possible)
          console.warn("Document utilisateur Firestore introuvable pour l'UID :", firebaseUser.uid);
          // Créer un document minimal s'il n'existe pas encore
          const minimalUser = new Utilisateur(firebaseUser.uid, null, firebaseUser.email, null, null, null, null, null, null, []);
          await firestore.collection('users').doc(firebaseUser.uid).set(this._toPlainObject(minimalUser));
          return minimalUser;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du document utilisateur Firestore:', error);
        return null;
      }
    }
    return null;
  }

  // Écoute les changements d'état d'authentification de l'utilisateur
  onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
  }

  // Convertit une instance d'Utilisateur en un objet JavaScript simple
  _toPlainObject(instance) {
    // Cela copiera toutes les propriétés propres et énumérables de l'instance
    return { ...instance };
  }
}

export default new AuthService();

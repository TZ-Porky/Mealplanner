// src/utils/firebaseFunctions.js

// Importations directes des services Firebase spécifiques à React Native
// C'est la méthode recommandée avec @react-native-firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage'; // <-- Retiré car non utilisé

import { Alert, Platform } from 'react-native'; // Importe Alert et Platform de React Native

// Si vous comptez utiliser Google Sign-In, décommentez et installez la bibliothèque
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// Si vous comptez utiliser Facebook Login, décommentez et installez la bibliothèque
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';


// ===============================================
// FONCTIONS D'AUTHENTIFICATION (avec @react-native-firebase/auth)
// ===============================================

/**
 * Crée un nouvel utilisateur avec email et mot de passe.
 * @param {string} email - L'adresse e-mail de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Promise<Object|null>} L'objet utilisateur si succès, null si échec.
 */
export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    Alert.alert('Succès', 'Compte créé avec succès !');
    return userCredential.user;
  } catch (error) {
    console.error("Erreur d'inscription:", error.code, error.message);
    let errorMessage = "Une erreur est survenue lors de l'inscription.";
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Cette adresse e-mail est déjà utilisée.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Cette adresse e-mail est invalide.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Le mot de passe est trop faible.';
    }
    Alert.alert('Erreur d\'inscription', errorMessage);
    return null;
  }
};

/**
 * Connecte un utilisateur avec email et mot de passe.
 * @param {string} email - L'adresse e-mail de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Promise<Object|null>} L'objet utilisateur si succès, null si échec.
 */
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    Alert.alert('Succès', 'Connexion réussie !');
    return userCredential.user;
  } catch (error) {
    console.error("Erreur de connexion:", error.code, error.message);
    let errorMessage = "Une erreur est survenue lors de la connexion.";
    if (error.code === 'auth/invalid-email') {
      errorMessage = 'Adresse e-mail invalide.';
    } else if (error.code === 'auth/user-disabled') {
      errorMessage = 'Ce compte a été désactivé.';
    } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage = 'Adresse e-mail ou mot de passe incorrect.';
    }
    Alert.alert('Erreur de connexion', errorMessage);
    return null;
  }
};

/**
 * Déconnecte l'utilisateur actuel.
 * @returns {Promise<void>}
 */
export const signOutUser = async () => {
  try {
    await auth().signOut();
    Alert.alert('Succès', 'Déconnexion réussie !');
  } catch (error) {
    console.error("Erreur de déconnexion:", error.message);
    Alert.alert('Erreur', 'Impossible de se déconnecter. Veuillez réessayer.');
  }
};

/**
 * Envoie un email de réinitialisation de mot de passe.
 * @param {string} email - L'adresse e-mail à laquelle envoyer l'e-mail de réinitialisation.
 * @returns {Promise<void>}
 */
export const sendPasswordResetEmail = async (email) => {
  try {
    await auth().sendPasswordResetEmail(email);
    Alert.alert('Succès', 'Un e-mail de réinitialisation de mot de passe a été envoyé à votre adresse.');
  } catch (error) {
    console.error("Erreur d'envoi de réinitialisation:", error.code, error.message);
    let errorMessage = "Impossible d'envoyer l'e-mail de réinitialisation.";
    if (error.code === 'auth/invalid-email') {
      errorMessage = 'Adresse e-mail invalide.';
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = 'Aucun utilisateur trouvé avec cette adresse e-mail.';
    }
    Alert.alert('Erreur', errorMessage);
  }
};

/**
 * Gère l'état d'authentification de l'utilisateur (écouteur en temps réel).
 * @param {function} callback - Fonction appelée avec l'objet utilisateur (ou null) à chaque changement d'état.
 * @returns {function} Fonction de désinscription (pour nettoyer l'écouteur).
 */
export const onAuthStateChanged = (callback) => {
  return auth().onAuthStateChanged(callback);
};


// /**
//  * Connecte l'utilisateur avec Google.
//  * Nécessite une configuration approfondie de Google Sign-In (@react-native-google-signin/google-signin).
//  * Décommentez et adaptez selon votre implémentation.
//  * @returns {Promise<Object|null>} L'objet utilisateur si succès, null si échec.
//  */
// export const signInWithGoogle = async () => {
//   try {
//     // Obtenir l'ID Token de Google
//     await GoogleSignin.hasPlayServices();
//     const { idToken } = await GoogleSignin.signIn();
//     // Créer un credential Firebase avec le Google ID Token
//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//     // Connecter l'utilisateur avec le credential Firebase
//     const userCredential = await auth().signInWithCredential(googleCredential);
//     Alert.alert('Succès', 'Connexion Google réussie !');
//     return userCredential.user;
//   } catch (error) {
//     console.error("Erreur de connexion Google:", error.code, error.message);
//     if (error.code === 'ERR_CANCELED') {
//       console.log('Connexion Google annulée par l\'utilisateur.');
//     } else {
//       Alert.alert('Erreur', 'Impossible de se connecter avec Google. Veuillez réessayer.');
//     }
//     return null; // Retourne null en cas d'erreur ou d'annulation
//   }
// };

// /**
//  * Connecte l'utilisateur avec Facebook.
//  * Nécessite une configuration approfondie de Facebook SDK (react-native-fbsdk-next).
//  * Décommentez et adaptez selon votre implémentation.
//  * @returns {Promise<Object|null>} L'objet utilisateur si succès, null si échec.
//  */
// export const signInWithFacebook = async () => {
//   try {
//     // Tenter de se connecter avec les permissions par défaut
//     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

//     if (result.isCancelled) {
//       console.log('Connexion Facebook annulée par l\'utilisateur.');
//       return null;
//     }

//     // Une fois connecté, obtenir le token d'accès
//     const data = await AccessToken.getCurrentAccessToken();

//     if (!data) {
//       throw new Error('Un problème est survenu lors de l\'obtention du jeton d\'accès.');
//     }

//     // Créer un credential Firebase avec le Facebook Access Token
//     const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

//     // Connecter l'utilisateur avec le credential Firebase
//     const userCredential = await auth().signInWithCredential(facebookCredential);
//     Alert.alert('Succès', 'Connexion Facebook réussie !');
//     return userCredential.user;
//   } catch (error) {
//     console.error("Erreur de connexion Facebook:", error.code, error.message);
//     Alert.alert('Erreur', 'Impossible de se connecter avec Facebook. Veuillez réessayer.');
//     return null; // Retourne null en cas d'erreur
//   }
// };


// ===============================================
// FONCTIONS CLOUD FIRESTORE (CRUD de base avec @react-native-firebase/firestore)
// ===============================================

/**
 * Ajoute un nouveau document à une collection Firestore.
 * @param {string} collectionName - Nom de la collection.
 * @param {Object} data - Les données du document à ajouter.
 * @returns {Promise<string|null>} L'ID du document ajouté si succès, null si échec.
 */
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await firestore().collection(collectionName).add({
      ...data,
      createdAt: firestore.FieldValue.serverTimestamp(), // Ajoute un horodatage côté serveur
    });
    Alert.alert('Succès', 'Document ajouté avec succès !');
    return docRef.id;
  } catch (error) {
    console.error(`Erreur lors de l'ajout du document à ${collectionName}:`, error);
    Alert.alert('Erreur', `Impossible d'ajouter le document à ${collectionName}.`);
    return null;
  }
};

/**
 * Récupère tous les documents d'une collection Firestore.
 * @param {string} collectionName - Nom de la collection.
 * @returns {Promise<Array>} Un tableau d'objets documents (avec leur ID).
 */
export const getCollection = async (collectionName) => {
  try {
    const snapshot = await firestore().collection(collectionName).get();
    const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return documents;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la collection ${collectionName}:`, error);
    Alert.alert('Erreur', `Impossible de récupérer les documents de ${collectionName}.`);
    return [];
  }
};

/**
 * Récupère un document spécifique par son ID.
 * @param {string} collectionName - Nom de la collection.
 * @param {string} docId - L'ID du document.
 * @returns {Promise<Object|null>} L'objet document (avec son ID) si trouvé, null si non trouvé ou erreur.
 */
export const getDocumentById = async (collectionName, docId) => {
  try {
    const doc = await firestore().collection(collectionName).doc(docId).get();
    if (doc.exists) {
      return { id: doc.id, ...doc.data() };
    } else {
      console.log(`Document avec l'ID ${docId} non trouvé dans ${collectionName}.`);
      return null;
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération du document ${docId} de ${collectionName}:`, error);
    Alert.alert('Erreur', `Impossible de récupérer le document ${docId}.`);
    return null;
  }
};

/**
 * Met à jour un document existant.
 * @param {string} collectionName - Nom de la collection.
 * @param {string} docId - L'ID du document à mettre à jour.
 * @param {Object} data - Les données à mettre à jour.
 * @returns {Promise<boolean>} True si succès, false si échec.
 */
export const updateDocument = async (collectionName, docId, data) => {
  try {
    await firestore().collection(collectionName).doc(docId).update(data);
    Alert.alert('Succès', 'Document mis à jour avec succès !');
    return true;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du document ${docId} dans ${collectionName}:`, error);
    Alert.alert('Erreur', `Impossible de mettre à jour le document ${docId}.`);
    return false;
  }
};

/**
 * Supprime un document spécifique.
 * @param {string} collectionName - Nom de la collection.
 * @param {string} docId - L'ID du document à supprimer.
 * @returns {Promise<boolean>} True si succès, false si échec.
 */
export const deleteDocument = async (collectionName, docId) => {
  try {
    await firestore().collection(collectionName).doc(docId).delete();
    Alert.alert('Succès', 'Document supprimé avec succès !');
    return true;
  } catch (error) {
    console.error(`Erreur lors de la suppression du document ${docId} de ${collectionName}:`, error);
    Alert.alert('Erreur', `Impossible de supprimer le document ${docId}.`);
    return false;
  }
};

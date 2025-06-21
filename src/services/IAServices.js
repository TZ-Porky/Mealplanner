import axios from 'axios';
import firestore from '@react-native-firebase/firestore';

const OPENAI_API_KEY = '';

export const askAI = async userInput => {
  const prompt = `Réponds en tant que diététicien. Voici la question de l'utilisateur : ${userInput}`;

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: prompt}],
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    },
  );

  return response.data.choices[0].message.content;
};

// Sauvegarder un message dans Firestore
export const saveMessage = async (from, text) => {
  try {
    await firestore().collection('messages').add({
      from,
      text,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  } catch (err) {
    console.error('Erreur sauvegarde Firestore :', err);
  }
};

// Charger tous les messages depuis Firestore (triés par date)
export const loadMessages = async () => {
  try {
    const snapshot = await firestore()
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      from: doc.data().from,
      text: doc.data().text,
    }));
  } catch (err) {
    console.error('Erreur chargement messages Firestore :', err);
    return [];
  }
};

// Supprimer tous les messages
export const clearMessages = async () => {
  try {
    const snapshot = await firestore().collection('messages').get();
    const batch = firestore().batch();

    snapshot.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
  } catch (err) {
    console.error('Erreur suppression Firestore :', err);
  }
};

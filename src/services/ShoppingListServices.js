import firestore from '@react-native-firebase/firestore';
import ShoppingList from '../models/ShoppingList';

const shoppingListsCollection = firestore().collection('shoppingLists');

class ShoppingListServices {
  static async createShoppingList(shoppingList) {
    try {
      const docRef = await shoppingListsCollection.add(shoppingList.toPlainObject());
      console.log('Liste de courses ajoutée avec l\'ID:', docRef.id);
      return { ...shoppingList, id: docRef.id };
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la liste de courses:', error);
      throw error;
    }
  }

  static async getShoppingListById(id) {
    try {
      const doc = await shoppingListsCollection.doc(id).get();
      if (doc.exists) {
        return ShoppingList.fromFirestore(doc.data(), doc.id);
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération de la liste de courses:', error);
      throw error;
    }
  }

  static async updateShoppingList(shoppingList) {
    try {
      await shoppingListsCollection.doc(shoppingList.id).update(shoppingList.toPlainObject());
      console.log('Liste de courses mise à jour:', shoppingList.id);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la liste de courses:', error);
      throw error;
    }
  }

  // ... (ajouter d'autres méthodes comme deleteShoppingList, getAllShoppingListsForUser, etc.)
}

export default ShoppingListServices;

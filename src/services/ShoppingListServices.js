import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ShoppingList from '../models/ListeCourse';

class ShoppingListServices {
  constructor() {
    this.shoppingListCollection = firestore().collection('shopping_lists');
  }

  // Crée une nouvelle liste de courses dans le Firestore
  async createShoppingList(shoppingList) {
    try {
      // Assigner l'UID de l'utilisateur courant si non déjà défini
      if (!shoppingList.userId && auth().currentUser) {
        shoppingList.userId = auth().currentUser.uid;
      }
      shoppingList.dateCreation = new Date(); // Assurer une date de création actuelle

      const docRef = await this.shoppingListCollection.add(shoppingList.toPlainObject());
      shoppingList.id = docRef.id;
      return shoppingList;
    } catch (error) {
      console.error('Erreur lors de la création de la liste de courses :', error);
      throw error;
    }
  }

  // Récupère une liste de courses par son ID
  async getShoppingListById(shoppingListID) {
    try {
      const doc = await this.shoppingListCollection.doc(shoppingListID).get();
      if (doc.exists) {
        return ShoppingList.fromFirestore(doc.data(), doc.id);
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération de la liste de courses :', error);
      throw error;
    }
  }

  // Récupère toutes les listes de courses ou celles d'un utilisateur spécifique
  async getShoppingList(userId = null) {
    try {
      let query = this.shoppingListCollection;
      if (userId) {
        query = query.where('userId', '==', userId);
      }
      const snapshot = await query.get();
      return snapshot.docs.map(doc =>
        ShoppingList.fromFirestore(doc.data(), doc.id),
      );
    } catch (error) {
      console.error('Erreur lors de la récupération des listes des courses :', error);
      throw error;
    }
  }

  // Met à jour une liste de courses existante
  async updateShoppingList(shoppingListID, updates) {
    try {
      await this.shoppingListCollection.doc(shoppingListID).update(updates);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la liste de courses :', error);
      throw error;
    }
  }

  // Supprime une liste de courses
  async deleteShoppingList(recipeId) {
    try {
      await this.shoppingListCollection.doc(recipeId).delete();
    } catch (error) {
      console.error('Erreur lors de la suppression de la liste de courses :', error);
      throw error;
    }
  }

  // Surveille les modifications faites sur un réel
  onShoppingListChanged(callback, userId = null) {
    let query = this.shoppingListCollection;
    if (userId) {
      query = query.where('userId', '==', userId);
    }
    return query.onSnapshot(
      snapshot => {
        const recipes = snapshot.docs.map(doc =>
            ShoppingList.fromFirestore(doc.data(), doc.id),
        );
        callback(recipes);
      },
      error => {
        console.error("Erreur d'écoute en temps réel des listes des courses:", error);
      },
    );
  }
}

export default new ShoppingListServices();

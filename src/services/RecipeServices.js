import firestore from '@react-native-firebase/firestore'; // Importe firestore directement
import auth from '@react-native-firebase/auth'; // Importe auth directement
import Recette from '../models/Recette';

class RecipeServices {
  constructor() {
    this.recipesCollection = firestore().collection('recipes');
  }

  // Crée une nouvelle recette dans le Firestore
  async createRecipe(recette) {
    try {
      // Assigner l'UID de l'utilisateur courant si non déjà défini
      if (!recette.userId && auth().currentUser) {
        recette.userId = auth().currentUser.uid;
      }
      recette.dateCreation = new Date(); // Assurer une date de création actuelle

      const docRef = await this.recipesCollection.add(recette.toPlainObject());
      recette.id = docRef.id; // Met à jour l'ID de l'objet recette
      return recette;
    } catch (error) {
      console.error('Erreur lors de la création de la recette :', error);
      throw error;
    }
  }

  // Récupère une recette par son ID
  async getRecipeById(recipeId) {
    try {
      const doc = await this.recipesCollection.doc(recipeId).get();
      if (doc.exists) {
        return Recette.fromFirestore(doc.data(), doc.id);
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération de la recette :', error);
      throw error;
    }
  }

  // Récupère toutes les recettes ou celles d'un utilisateur spécifique
  async getRecipes(userId = null) {
    try {
      let query = this.recipesCollection;
      if (userId) {
        query = query.where('userId', '==', userId);
      }
      const snapshot = await query.get();
      return snapshot.docs.map(doc =>
        Recette.fromFirestore(doc.data(), doc.id),
      );
    } catch (error) {
      console.error('Erreur lors de la récupération des recettes :', error);
      throw error;
    }
  }

  // Met à jour une recette existante
  async updateRecipe(recipeId, updates) {
    try {
      await this.recipesCollection.doc(recipeId).update(updates);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la recette :', error);
      throw error;
    }
  }

  // Supprime une recette
  async deleteRecipe(recipeId) {
    try {
      await this.recipesCollection.doc(recipeId).delete();
    } catch (error) {
      console.error('Erreur lors de la suppression de la recette :', error);
      throw error;
    }
  }

  // Surveille les modifications faites sur un réel
  onRecipesChanged(callback, userId = null) {
    let query = this.recipesCollection;
    if (userId) {
      query = query.where('userId', '==', userId);
    }
    return query.onSnapshot(
      snapshot => {
        const recipes = snapshot.docs.map(doc =>
          Recette.fromFirestore(doc.data(), doc.id),
        );
        callback(recipes);
      },
      error => {
        console.error("Erreur d'écoute en temps réel des recettes:", error);
      },
    );
  }
}

export default new RecipeServices();

import Ingredient from './Ingredient';
import Utensil from './Ustensile'; // Renommé pour la cohérence

class Recette { // Tu peux aussi renommer la classe en "Recipe"
  constructor(
    id = null,
    title,
    imageUrl,
    description = '', // Ajouté comme dans les maquettes
    ingredients = [],
    instructions = [],
    utensils = [],
    servings,
    preparationTimeMinutes, // Renommé
    difficulty, // Renommé
    tags = [],
    category, // Renommé
    userId = null,
    dateCreation = new Date(),
    rating = 0,
  ) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description; // Ajouté
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.utensils = utensils; // Renommé
    this.servings = servings; // Renommé
    this.preparationTimeMinutes = preparationTimeMinutes; // Renommé
    this.difficulty = difficulty; // Renommé
    this.tags = tags;
    this.category = category; // Renommé
    this.userId = userId;
    this.dateCreation = dateCreation;
    this.rating = rating;
  }

  calculateTotalCost() {
    let totalCostIngredients = 0;
    this.ingredients.forEach(ing => {
      totalCostIngredients += ing.quantity * ing.unitCost;
    });
    // Ajoutez ici le coût des ustensiles si applicable, ou d'autres coûts fixes
    return totalCostIngredients;
  }

  // Méthode pour convertir l'instance de classe en un objet JavaScript pur pour Firestore
  toPlainObject() {
    return {
      title: this.title,
      imageUrl: this.imageUrl,
      description: this.description, // Ajouté
      ingredients: this.ingredients.map(ing => ing.toPlainObject()),
      instructions: this.instructions,
      utensils: this.utensils.map(ust => ust.toPlainObject()), // Renommé
      servings: this.servings, // Renommé
      preparationTimeMinutes: this.preparationTimeMinutes, // Renommé
      difficulty: this.difficulty, // Renommé
      tags: this.tags,
      category: this.category, // Renommé
      userId: this.userId,
      dateCreation: this.dateCreation,
      rating: this.rating,
    };
  }

  // Méthode statique pour créer une instance de Recette à partir d'un objet Firestore
  static fromFirestore(data, id) {
    const ingredients = Array.isArray(data.ingredients)
      ? data.ingredients.map(ing => Ingredient.fromFirestore(ing))
      : [];
    const utensils = Array.isArray(data.utensils) // Utilise 'utensils'
      ? data.utensils.map(ust => Utensil.fromFirestore(ust))
      : [];
    const instructions = Array.isArray(data.instructions)
      ? data.instructions
      : [];
    const tags = Array.isArray(data.tags)
      ? data.tags
      : [];

    return new Recette(
      id,
      data.title,
      data.imageUrl,
      data.description || '',
      ingredients,
      instructions,
      utensils,
      data.servings,
      data.preparationTimeMinutes,
      data.difficulty,
      tags,
      data.category,
      data.userId,
      data.dateCreation ? data.dateCreation.toDate() : new Date(),
      data.rating || 0
    );
  }
}

export default Recette; // Ou export default Recipe;

import Ingredient from './Ingredient';
import Utensil from './Ustensile';

class Recette {
  constructor(
    id = null,
    title,
    imageUrl,
    description = '',
    ingredients = [],
    instructions = [],
    utensils = [],
    servings,
    preparationTimeMinutes,
    difficulty,
    tags = [],
    category,
    userId = null,
    dateCreation = new Date(),
    rating = 0,
  ) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.utensils = utensils;
    this.servings = servings;
    this.preparationTimeMinutes = preparationTimeMinutes;
    this.difficulty = difficulty;
    this.tags = tags;
    this.category = category;
    this.userId = userId;
    this.dateCreation = dateCreation;
    this.rating = rating;
  }

  calculateTotalCost() {
    let totalCostIngredients = 0;
    this.ingredients.forEach(ing => {
      totalCostIngredients += ing.quantity * ing.unitCost;
    });
    return totalCostIngredients;
  }

  // Méthode pour convertir l'instance de classe en un objet JavaScript pur pour Firestore
  toPlainObject() {
    return {
      title: this.title,
      imageUrl: this.imageUrl,
      description: this.description,
      ingredients: this.ingredients.map(ing => ing.toPlainObject()),
      instructions: this.instructions,
      utensils: this.utensils.map(ust => ust.toPlainObject()),
      servings: this.servings,
      preparationTimeMinutes: this.preparationTimeMinutes,
      difficulty: this.difficulty,
      tags: this.tags,
      category: this.category,
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
    const utensils = Array.isArray(data.utensils)
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

class Ingredient {
  constructor(name, quantity, unitOfMeasure, category, unitCost = 0, imageUrl = null) {
    this.name = name;
    this.quantity = quantity;
    this.unitOfMeasure = unitOfMeasure;
    this.category = category; // Ex: "Vegetables", "Dairy", "Meats"
    this.unitCost = unitCost; // Cost per unit (e.g., XAF per gram)
    this.imageUrl = imageUrl;
  }

  toPlainObject() {
    return {
      name: this.name,
      quantity: this.quantity,
      unitOfMeasure: this.unitOfMeasure,
      category: this.category,
      unitCost: this.unitCost,
      imageUrl: this.imageUrl,
    };
  }

  // Utilisé pour créer une instance à partir de données de Firestore
  static fromFirestore(data) {
    return new Ingredient(
      data.name,
      data.quantity,
      data.unitOfMeasure,
      data.category,
      data.unitCost,
      data.imageUrl || null
    );
  }
}

export default Ingredient;

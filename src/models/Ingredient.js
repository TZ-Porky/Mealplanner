class Ingredient {
  constructor(nom, quantité, unité, catégorie, prixUnitaire, imageUrl = null) {
    this.nom = nom; //
    this.quantité = quantité; //
    this.unité = unité; //
    this.catégorie = catégorie; //
    this.prixUnitaire = prixUnitaire; //
    this.imageUrl = imageUrl; // Image ou illustration (Optionnelle)
  }
}

export default Ingredient;

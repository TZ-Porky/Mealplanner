class Ustensile {
  constructor(nom, quantité, prixUnitaire, imageUrl = null) {
    this.nom = nom; //
    this.quantité = quantité; //
    this.prixUnitaire = prixUnitaire; //
    this.imageUrl = imageUrl; // Image ou illustration (Optionnelle)
  }
}

export default Ustensile;

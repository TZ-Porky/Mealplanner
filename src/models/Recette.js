class Recette {
  constructor(
    nom,
    imageUrl,
    ingredients = [], // Liste des ingrédients
    instructions = [], // Liste des instructions
    ustensiles = [], // Liste des ustensiles
    nombreDePortions, //
    dureeInitialeParPersonne, // Pour calculer le temps total de préparation
    difficultéExecution, // Représenté par un nombre d'étoiles
    tags = [], // Liste des tags
    categorie, // Catégorie
  ) {
    this.nom = nom;
    this.imageUrl = imageUrl; // Image du plat
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.ustensiles = ustensiles;
    this.nombreDePortions = nombreDePortions;
    this.dureeInitialeParPersonne = dureeInitialeParPersonne;
    this.difficultéExecution = difficultéExecution;
    this.tags = tags;
    this.categorie = categorie;
  }

  calculerCoutPreparation() {
    // S'obtient à partir du nombre de portions, du prix total des ingrédients utilisées.
    let coutTotalIngredients = 0;
    this.ingredients.forEach(ing => {
      coutTotalIngredients += ing.quantité * ing.prixUnitaire;
    });
    // Vous devrez peut-être ajuster le coût en fonction du nombre de portions si votre prix unitaire d'ingrédient est pour une portion spécifique.
    // Ici, on suppose que 'ing.quantité' est la quantité totale pour 'nombreDePortions'.
    return coutTotalIngredients;
  }

  calculerTempsTotalPreparation() {
    // S'obtient à partir de la durée initiale du plat pour une personne et le nombre de portions
    // Cette logique est une simplification, le temps de préparation n'est pas toujours linéaire avec le nombre de portions.
    // Vous devrez affiner cette logique.
    return this.dureeInitialeParPersonne * this.nombreDePortions;
  }
}

export default Recette;

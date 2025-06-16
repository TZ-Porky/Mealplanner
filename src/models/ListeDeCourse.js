import Ingredient from './Ingredient';
import Ustensile from './Ustensile';

class ListeDeCourse {
  constructor(
    label,
    ingredientsAcheter = [],
    ustensilesAcheter = [],
    lieuDeMarche,
    nomRecetteAssociee,
    dateCreation,
    etat = 'EN COURS',
  ) {
    this.label = label; //
    this.ingredientsAcheter = ingredientsAcheter; // Liste des ingrédients à acheter
    this.ustensilesAcheter = ustensilesAcheter; // Liste des ustensiles à acheter
    this.lieuDeMarche = lieuDeMarche; //
    this.nomRecetteAssociee = nomRecetteAssociee; // Nom de la recette à laquelle appartient la liste
    this.dateCreation = dateCreation; // Date de création de la liste
    this.etat = etat; // Etat de la liste course (EN COURS, TERMINE)
  }

  ajouterIngredient(ingredient) {
    if (ingredient instanceof Ingredient) {
      this.ingredientsAcheter.push(ingredient);
      return true;
    }
    console.warn("L'objet ajouté n'est pas un Ingrédient.");
    return false;
  }

  supprimerIngredient(nomIngredient) {
    const initialLength = this.ingredientsAcheter.length;
    this.ingredientsAcheter = this.ingredientsAcheter.filter(
      ing => ing.nom !== nomIngredient,
    );
    return this.ingredientsAcheter.length < initialLength;
  }

  ajouterUstensile(ustensile) {
    if (ustensile instanceof Ustensile) {
      this.ustensilesAcheter.push(ustensile);
      return true;
    }
    console.warn("L'objet ajouté n'est pas un Ustensile.");
    return false;
  }

  supprimerUstensile(nomUstensile) {
    const initialLength = this.ustensilesAcheter.length;
    this.ustensilesAcheter = this.ustensilesAcheter.filter(
      ust => ust.nom !== nomUstensile,
    );
    return this.ustensilesAcheter.length < initialLength;
  }
}

export default ListeDeCourse;

import MembreFamille from './MembreFamille';

class Famille {
  constructor(nomFamille, membres = []) {
    this.nomFamille = nomFamille;
    this.membres = membres; // Tableau d'objets MembreFamille
  }

  ajouterMembre(membre) {
    if (membre instanceof MembreFamille) {
      this.membres.push(membre); //
      return true;
    }
    console.warn("L'objet ajouté n'est pas un MembreFamille.");
    return false;
  }

  supprimerMembre(membreId) {
    const initialLength = this.membres.length;
    this.membres = this.membres.filter(membre => membre.id !== membreId);
    return this.membres.length < initialLength; // Retourne true si un membre a été supprimé
  }

  getNombreDePortionsPredefini() {
    // Permet de connaître le nombre prédéfini de portions à préparer à l'avance pour les recettes.
    // Cette logique dépendra de comment vous définissez ce "nombre prédéfini".
    // Pour l'instant, on peut retourner le nombre de membres ou une valeur par défaut.
    return this.membres.length > 0 ? this.membres.length : 1;
  }
}

export default Famille;

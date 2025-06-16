class Commentaire {
  constructor(recetteId, userId, nomUtilisateur, texte, dateCreation) {
    this.recetteId = recetteId; // L'ID de la recette commentée
    this.userId = userId; // L'ID de l'utilisateur qui a posté le commentaire
    this.nomUtilisateur = nomUtilisateur; // Le nom de l'utilisateur (pour l'affichage)
    this.texte = texte; // Le contenu du commentaire
    this.dateCreation = dateCreation; // La date et l'heure du commentaire
  }

  // Tu pourrais ajouter des méthodes pour éditer ou supprimer le commentaire si nécessaire
}

export default Commentaire;

import Individu from './Individu';

class MembreFamille extends Individu {
  constructor(fullName, age, sexe, allergies = []) {
    // Moins d'informations nécessaires
    super(fullName, null, null, age, sexe, null, null, null, allergies); // Passer null pour les champs non nécessaires
    // Vous pouvez ajouter un ID unique si vous ne comptez pas utiliser l'UID de l'utilisateur principal
    this.id =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
  }
}

export default MembreFamille;

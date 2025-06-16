import Individu from './Individu';

class Utilisateur extends Individu {
  constructor(
    uid,
    fullName,
    email,
    phoneNumber,
    age,
    sexe,
    activiteProfessionnelle,
    nationalite,
    paysResidence,
    allergies = [],
  ) {
    super(
      fullName,
      email,
      phoneNumber,
      age,
      sexe,
      activiteProfessionnelle,
      nationalite,
      paysResidence,
      allergies,
    );
    this.uid = uid; // Identifiant Firebase de l'utilisateur
  }
}

export default Utilisateur;

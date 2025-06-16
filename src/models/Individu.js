class Individu {
  constructor(
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
    this.fullName = fullName; //
    this.email = email; //
    this.phoneNumber = phoneNumber; //
    this.age = age; //
    this.sexe = sexe; //
    this.activiteProfessionnelle = activiteProfessionnelle; //
    this.nationalite = nationalite; //
    this.paysResidence = paysResidence; //
    this.allergies = allergies; // Tableau d'allergènes
  }

  // Vous pouvez ajouter des méthodes génériques ici si nécessaire
}

export default Individu;

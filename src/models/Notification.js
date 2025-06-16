class Notification {
  constructor(
    userId,
    titre,
    message,
    dateCreation,
    lue = false,
    type = 'info',
  ) {
    this.userId = userId; // L'ID de l'utilisateur concerné par la notification
    this.titre = titre; // Le titre de la notification (ex: "Rappel de repas")
    this.message = message; // Le corps du message (ex: "N'oubliez pas votre dîner de ce soir !")
    this.dateCreation = dateCreation; // La date et l'heure de création de la notification
    this.lue = lue; // Statut de lecture (true si lue, false sinon)
    this.type = type; // Type de notification (ex: 'info', 'alerte', 'promotion')
  }

  markAsRead() {
    this.lue = true;
  }
}

export default Notification;

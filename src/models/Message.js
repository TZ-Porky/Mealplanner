class Message {
  constructor(senderId, receiverId, texte, dateEnvoi, lu = false) {
    this.senderId = senderId; // L'ID de l'expéditeur
    this.receiverId = receiverId; // L'ID du destinataire
    this.texte = texte; // Le contenu du message
    this.dateEnvoi = dateEnvoi; // La date et l'heure d'envoi
    this.lu = lu; // Statut de lecture
  }

  markAsRead() {
    this.lu = true;
  }
}

export default Message;

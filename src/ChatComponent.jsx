import axios from 'axios'; // Nous allons utiliser Axios pour envoyer des requêtes HTTP
import React, { useState } from 'react';

const Chatbot = () => {
  // États pour stocker les messages et le message actuel de l'utilisateur
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  // Gérer le changement de message de l'utilisateur
  const handleMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  // Fonction pour envoyer le message au backend et recevoir la réponse
  const sendMessage = async () => {
    if (userMessage.trim() === '') return; // Ne rien faire si le message est vide

    // Ajouter le message de l'utilisateur dans le tableau de messages
    setMessages([...messages, { text: userMessage, sender: 'user' }]);
    setUserMessage(''); // Réinitialiser le champ de saisie

    try {
      // Envoyer le message au backend pour obtenir une réponse du chatbot
      const response = await axios.post('http://localhost:3001/message', { message: userMessage });
      const botMessage = response.data.response;

      // Ajouter la réponse du chatbot
      setMessages([...messages, { text: userMessage, sender: 'user' }, { text: botMessage, sender: 'bot' }]);
    } catch (error) {
      console.error('Erreur en envoyant le message:', error);
      setMessages([...messages, { text: userMessage, sender: 'user' }, { text: "Désolé, une erreur est survenue.", sender: 'bot' }]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Champ de texte pour saisir le message */}
      <input
        type="text"
        value={userMessage}
        onChange={handleMessageChange}
        placeholder="Tapez votre message..."
      />

      {/* Bouton pour envoyer le message */}
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  );
};

export default Chatbot;

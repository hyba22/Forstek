import React, { useState } from "react";

const API_URL = "https://api.openai.com/v1/chat/completions"; // Exemple avec OpenAI API
const API_KEY = "VOTRE_CLE_API"; // Remplacez par votre clé API

const Chat = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
  const [typingIndicatorMessage, setTypingIndicatorMessage] = useState("Typing...");
  const [history, setHistory] = useState([]);

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    const userMessage = { message: userInput, type: "user" };
    setChatMessages([...chatMessages, userMessage]);
    setUserInput("");
    setIsChatbotTyping(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4", // Modèle OpenAI utilisé
          messages: [...chatMessages, { role: "user", content: userInput }],
          max_tokens: 150,
        }),
      });

      const data = await response.json();
      const botMessage = {
        message: data.choices[0]?.message?.content || "Je n'ai pas compris...",
        type: "chatbot",
      };

      setTimeout(() => {
        setChatMessages([...chatMessages, userMessage, botMessage]);
        setHistory([...history, userMessage, botMessage]);
        setIsChatbotTyping(false);
      }, 1000);
    } catch (error) {
      console.error("Erreur:", error);
      setChatMessages([...chatMessages, { message: "Erreur de connexion...", type: "chatbot" }]);
      setIsChatbotTyping(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-body">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.type}`}>
            <p>{msg.message}</p>
          </div>
        ))}
        {isChatbotTyping && <div className="typing-indicator">{typingIndicatorMessage}</div>}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Tapez votre message..."
        />
        <button onClick={sendMessage}>Envoyer</button>
      </div>
    </div>
  );
};

export default Chat;

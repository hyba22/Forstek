import React, { useEffect, useRef } from "react";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

const ChatBody = ({ chatMessages, isChatbotTyping }) => {
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="chat-body" ref={chatBodyRef}>
      {chatMessages.map((chat, index) => (
        <Message key={index} message={chat.message} type={chat.type} />
      ))}
      {isChatbotTyping && <TypingIndicator />}
    </div>
  );
};

export default ChatBody;

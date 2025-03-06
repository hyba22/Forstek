import React from "react";

const Message = ({ message, type }) => {
  return <div className={type === "user" ? "user-message" : "bot-message"}>{message}</div>;
};

export default Message;

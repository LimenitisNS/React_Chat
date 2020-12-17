import React from "react";

export default function Chat({ userId, chat, deleteHandler, joinHandler, goHandler }) {
  function isOwner() {
    return userId === chat.userId;
  }

  function isParticipant() {
    return chat.participants.includes(userId);
  }

  function renderChat() {
    if (isOwner()) {
      return (
        <>
          <a href="/" onClick={(event) => innerClickHandle(event)}>
            {chat.title}
          </a>
          <button onClick={() => deleteHandler(chat.id)}>Delete</button>
        </>
      );
    }
    if (isParticipant()) {
      return (
        <>
          <a href="/" onClick={(event) => innerClickHandle(event)}>
            {chat.title}
          </a>
        </>
      );
    }
    return (
      <>
        <span>{chat.title}</span>
        <button className="enterButton" onClick={() => joinHandler(chat.id)}>
          Enter
        </button>
      </>
    );
  }

  function innerClickHandle(event) {
    event.preventDefault();
    goHandler(chat.id);
  }

  return <li>{renderChat()}</li>;
}

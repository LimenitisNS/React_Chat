import React from "react";
import { IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import ChangeTitle from "@/components/ChangeTitle/ChangeTitle";

export default function Chat({ userId, chat, deleteHandler, joinHandler, goHandler }) {
  const [openChat, setOpenChat] = React.useState(false);
  function isOwner() {
    return userId === chat.userId;
  }

  function isParticipant() {
    return chat.participants.includes(userId);
  }

  const handleClickOpen = () => {
    setOpenChat(true);
  };

  const handleClose = () => {
    setOpenChat(false);
  };

  function renderChat() {
    if (isOwner()) {
      return (
        <>
          <a href="/" onClick={(event) => innerClickHandle(event)}>
            {chat.title}
          </a>
          <button onClick={() => deleteHandler(chat.id)}>Delete</button>
          <IconButton onClick={handleClickOpen}>
            <CreateIcon />
          </IconButton>
          <ChangeTitle onClose={handleClose} open={openChat} chat={chat} />
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

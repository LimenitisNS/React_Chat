import React, { useEffect, useState } from "react";
import APIService from "@/APIService";
import styles from "./styles.module.css";
import ChatForm from "@/components/ChatForm";
import ChatList from "@/components/ChatList";
import SearchChatForm from "@/components/SearchChatForm";
import Button from "@material-ui/core/Button";
import ChangePassword from "@/components/ChangePassword";

export default function ProfileView({ history, user }) {
  const [open, setOpen] = React.useState(false);
  const [chats, setChats] = useState([]);
  const [foundChats, setFoundChats] = useState([]);

  useEffect(() => {
    getChatList();
  }, []);

  function handleCreateChat({ title, isPrivate }) {
    APIService.chat.create({ title, isPrivate }).then(() => getChatList());
  }

  function getChatList() {
    APIService.chat
      .getMyChats(user.id)
      .then((response) => response.data)
      .then((chats) => setChats(chats));
  }

  function goHandler(id) {
    history.push(`/chat/${id}`);
  }

  function joinHandler(id) {
    if (!confirm("Do you want to join the chat ?")) return;
    APIService.chat.join(id).then(() => getChatList());
  }

  function deleteHandler(id) {
    if (!confirm("Do you want to delete the chat ?")) return;
    APIService.chat.delete(id).then(() => getChatList());
  }

  function handleChatSearch({ title }) {
    APIService.chat
      .search(title)
      .then((response) => response.data)
      .then((foundChats) => setFoundChats(foundChats));
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h1>Profile user</h1>
      <div className={styles.profile_info}>
        {user && (
          <>
            <div>Nickname: {user.nickname}</div>
            <div>Create: {new Date(user.createdAt).toLocaleString()}</div>
          </>
        )}
      </div>
      <Button variant="contained" onClick={handleClickOpen}>
        Change password
      </Button>
      <ChangePassword open={open} onClose={handleClose} />
      <h3>Chats</h3>
      <ChatList
        userId={user.id}
        list={chats}
        goHandler={(id) => goHandler(id)}
        joinHandler={(id) => joinHandler(id)}
        deleteHandler={(id) => deleteHandler(id)}
      />
      <ChatForm handleSubmit={(data) => handleCreateChat(data)} />

      <SearchChatForm handleSubmit={(data) => handleChatSearch(data)} />
      <ChatList
        userId={user.id}
        list={foundChats}
        goHandler={(id) => goHandler(id)}
        joinHandler={(id) => joinHandler(id)}
        deleteHandler={(id) => deleteHandler(id)}
      />
    </>
  );
}

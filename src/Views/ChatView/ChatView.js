import React, { useEffect, useState } from "react";
import Form from "@/components/Form/Form";
import MessagesList from "@/components/MessageList/MessagesList";
import APIService from "@/APIService";

export default function ChatView({ match }) {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
    const time = setInterval(getMessages, 1000);
    return () => clearInterval(time);
  }, []);

  function postMessage({ content }) {
    APIService.message.create({ content, chatId: match.params.id }).then(() => getMessages());
  }

  function getMessages() {
    APIService.message
      .getMessages(match.params.id)
      .then((response) => response.data)
      .then(async (messages) => {
        const users = await getUsers(messages);
        const newMessages = messages.map((message) => {
          const user = users.find((user) => user.id === message.userId);
          message.nickname = user.nickname;
          return message;
        });
        setUsers(users);
        setMessages(newMessages);
      });
  }

  function getUsers(messages) {
    const oldUsers = users;
    const oldUsersIds = oldUsers.map((user) => user.id);
    const newUsersIds = [...new Set(messages.map((message) => message.userId))];
    const toLoad = newUsersIds.filter((id) => !oldUsersIds.includes(id));

    if (!toLoad.length) return;

    return Promise.all(toLoad.map((id) => APIService.user.getById(id)))
      .then((response) => response.map((response) => response.data))
      .then((newUsers) => [...oldUsers, ...newUsers]);
  }

  return (
    <div className="chatView">
      <h1>Chat</h1>
      <Form postMessage={(data) => postMessage(data)} />
      <MessagesList messages={messages} />
    </div>
  );
}

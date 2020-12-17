import React from "react";
import Chat from "@/components/Chat";

export default function ChatList({ goHandler, userId, deleteHandler, joinHandler, list }) {
  return (
    <ul>
      {list.map((chat) => (
        <Chat
          userId={userId}
          chat={chat}
          goHandler={goHandler}
          joinHandler={joinHandler}
          deleteHandler={deleteHandler}
          key={chat.id}
        />
      ))}
    </ul>
  );
}

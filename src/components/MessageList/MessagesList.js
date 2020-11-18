import React from "react";
import Message from "../Message/Message";
import styles from "./styles.module.css";

export default class MessagesList extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <div className={styles.messages}>
        <ul>
          {messages.map((message) => (
            <Message nickname={message.nickname} content={message.content} key={message.id} />
          ))}
        </ul>
      </div>
    );
  }
}

import React from "react";
import Message from "../Message/Message";
import styles from "./styles.module.css"

export default class MessagesList extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <div className={styles.messages}>
        <ul>
          {messages.map((message, index) => (
            <Message nick={message.nick} message={message.message} key={index} />
          ))}
        </ul>
      </div>
    );
  }
}

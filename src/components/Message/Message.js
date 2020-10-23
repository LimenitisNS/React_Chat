import React from "react";
import styles from "./styles.module.css";

export default class Message extends React.Component {
  render() {
    const { nick, message } = this.props;
    return (
      <div className={styles.message}>
        <li>
          <b>{nick}:</b>
          {message}
        </li>
      </div>
    );
  }
}

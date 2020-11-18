import React from "react";
import styles from "./styles.module.css";

export default class Message extends React.Component {
  render() {
    const { nickname, content } = this.props;
    return (
      <div className={styles.message}>
        <li>
          <b>{nickname}:</b>
          {content}
        </li>
      </div>
    );
  }
}

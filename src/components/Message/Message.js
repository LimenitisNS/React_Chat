import React from "react";
import styles from "./styles.module.css";

export default function Message({ nickname, content }) {
  return (
    <div className={styles.message}>
      <li>
        <b>{nickname}:</b>
        {content}
      </li>
    </div>
  );
}

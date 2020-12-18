import React from "react";
import styles from "./styles.module.css";

export default function Message({ content, nickname }) {
  return (
    <div className={styles.message}>
      <li>
        <b>{nickname}:</b>
        {content}
      </li>
    </div>
  );
}

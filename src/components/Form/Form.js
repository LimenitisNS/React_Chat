import React from "react";
import styles from "./styles.module.css";

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      nick: "",
      message: ""
    };
  }

  handleSend() {
    const newMessage = {
      nick: this.state.nick,
      message: this.state.message
    };
    this.props.postMessage(newMessage);

    this.setState({
      message: ""
    });
  }

  render() {
    const { nick, message } = this.state;

    return (
      <div className={styles.form_style}>
        <form>
          <input
            value={nick}
            type="text"
            id="nick"
            className={styles.form_nick_input}
            placeholder="Enter nickname"
            onChange={(e) => this.setState({ nick: e.target.value })}
          />
          <br />
          <textarea
            value={message}
            id="message"
            placeholder="Enter your message"
            onChange={(e) => this.setState({ message: e.target.value })}
          />
          <br />
          <input type="button" id="button" value="Send" onClick={() => this.handleSend()} />
        </form>
      </div>
    );
  }
}

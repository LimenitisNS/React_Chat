import React from "react";
import Form from "../../components/Form/Form";
import MessagesList from "../../components/MessageList/MessagesList";
import styles from "./styles.module.css";

const URL = "http://localhost:3000/chat";

export default class ChatView extends React.Component {
  constructor() {
    super();
    this.state = {
      serverMessages: []
    };

    this.timer = null;
  }

  componentDidMount() {
    this.timer = setInterval(this.getMessages.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  postMessage(newMessage) {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", URL);
      xhr.send(
        JSON.stringify({
          nickname: newMessage.nickname,
          message: newMessage.message
        })
      );

      xhr.onload = () => this.handleOnload(xhr);

      xhr.onerror = function () {
        console.log("Запрос не удался");
      };
  }

  getMessages() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", URL);
    xhr.send();
    xhr.onload = () => this.handleOnload(xhr);
  }

  handleOnload(xhr) {
    if (xhr.status !== 200) {
      console.error("Error!");
    } else {
      this.drawMessages(xhr.response);
    }
  }

  drawMessages(response) {
    const newServerMessages = JSON.parse(response);
    this.setState({
      serverMessages: newServerMessages
    });
  }

  render() {
    const { serverMessages } = this.state;

    return (
      <>
        <h1 className={styles.nameChat}>Chat with the Devil</h1>
        <div className={styles.form}>
          <Form postMessage={(newMessage) => this.postMessage(newMessage)} />
          <MessagesList messages={serverMessages} />
        </div>
      </>
    );
  }
}

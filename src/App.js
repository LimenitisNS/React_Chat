import React from "react";
import Form from "./components/Form";
import MessagesList from "./components/MessagesList";

const URL = "http://localhost:3000";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      serverMessages: []
    };

    setInterval(this.getMessages.bind(this), 1000);
  }

  postMessage(newMessage) {
    if (nick.value === "" || message.value === "") {
      alert("Есть пустые поля");
    } else {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", URL);
      xhr.send(JSON.stringify(newMessage));

      xhr.onload = () => {
        if (xhr.status !== 200) {
          console.error("Ошибка!");
        } else {
          this.parseMessages(xhr.response);
        }
      };

      xhr.onerror = function () {
        console.log("Запрос не удался");
      };
    }
  }

  getMessages() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", URL);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        console.error("Ошибка!");
      } else {
        this.parseMessages(xhr.response);
      }
    };
  }

  parseMessages(response) {
    const newServerMessages = JSON.parse(response);
    this.setState({
      serverMessages: newServerMessages
    });
  }

  render() {
    const { serverMessages } = this.state;

    return (
      <>
        <h1 className="nameChat">Chat</h1>
        <h3 className="nameChat2">with the Devil</h3>
        <Form postMessage={(newMessage) => this.postMessage(newMessage)} />
        <MessagesList messages={serverMessages} />
      </>
    );
  }
}

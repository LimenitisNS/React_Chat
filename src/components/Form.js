import React from "react";

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
      <form>
        <input
          value={nick}
          type="text"
          id="nick"
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
    );
  }
}

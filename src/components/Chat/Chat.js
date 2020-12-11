import React from "react";
import PropTypes from "prop-types";

export default class Chat extends React.Component {
  isOwner() {
    return this.props.userId === this.props.chat.userId;
  }

  isParticipant() {
    return this.props.chat.participants.includes(this.props.userId);
  }

  renderChat() {
    if (this.isOwner()) {
      return (
        <>
          <a href="/" onClick={(event) => this.innerClickHandle(event)}>
            {this.props.chat.title}
          </a>
          <button onClick={() => this.props.deleteHandler(this.props.chat.id)}>Delete</button>
        </>
      );
    }
    if (this.isParticipant()) {
      return (
        <>
          <a href="/" onClick={(event) => this.innerClickHandle(event)}>
            {this.props.chat.title}
          </a>
        </>
      );
    }
    return (
      <>
        <span>{this.props.chat.title}</span>
        <button className="enterButton" onClick={() => this.props.joinHandler(this.props.chat.id)}>
          Enter
        </button>
      </>
    );
  }

  innerClickHandle(event) {
    event.preventDefault();
    this.props.goHandler(this.props.chat.id);
  }

  render() {
    return <li>{this.renderChat()}</li>;
  }
}

Chat.propTypes = {
  userId: PropTypes.string,
  chat: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    participant: PropTypes.arrayOf(PropTypes.string)
  }),
  goHandler: PropTypes.func,
  joinHandler: PropTypes.func,
  deleteHandler: PropTypes.func
};

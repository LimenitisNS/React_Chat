import React from "react";
import PropTypes from "prop-types";

export default class Chat extends React.Component {
  isOwner() {
    return this.props.userid === this.props.chat.userid;
  }

  isParticipant() {
    return this.props.chat.participant.includes(this.props.userid);
  }

  innerClickHandle(event) {
    event.preventDefault();
    this.props.goHandler(this.props.chat.id);
  }

  renderChat() {
    if (this.isOwner()) {
      return (
        <>
          <a href="#" onClick={(event) => this.innerClickHandle(event)}>
            {this.props.chat.title}
          </a>
        </>
      );
    }
    if (this.isParticipant()) {
      return (
        <>
          <a href="#" onClick={(event) => this.innerClickHandle(event)}>
            {this.props.chat.title}
          </a>
        </>
      );
    }
    return (
      <>
        <span>{this.props.chat.title}</span>
        <button onClick={() => this.props.joinHandler(this.props.chat.id)}>Enter</button>
      </>
    );
  }

  render() {
    return <li>{this.renderChat()}</li>;
  }
}

Chat.propTypes = {
  userid: PropTypes.string,
  chat: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    participant: PropTypes.arrayOf(PropTypes.string)
  }),
  goHandler: PropTypes.func,
  joinHandler: PropTypes.func,
  deleteHandler: PropTypes.func
};

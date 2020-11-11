import React from "react";
import PropTypes from "prop-types";

class Chat extends React.Component {
  innerClickHandle(event) {
    event.preventDefault();
    this.props.clickHandle(this.props.id);
  }

  render() {
    const { title } = this.props;
    return (
      <li>
        <a href="#" onClick={(event) => this.innerClickHandle(event)}>
          {title}
        </a>
      </li>
    );
  }
}

Chat.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Chat;

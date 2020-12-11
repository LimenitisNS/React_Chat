import React from "react";
import PropTypes from "prop-types";

export default class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      error: "",
      result: "",
      isPrivate: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit({
      title: this.state.title,
      isPrivate: this.state.isPrivate
    });
    this.setState({
      title: "",
      isPrivate: false
    });
  }

  render() {
    const { title, isPrivate } = this.state;
    return (
      <div className="chatForm">
        <h3>Create chat</h3>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <div>
            <label>Title</label>
            <input
              value={title}
              name="chat"
              onChange={(event) => this.setState({ title: event.target.value })}
            />
            <br />
            <label>Private</label>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(event) => this.setState({ isPrivate: event.target.checked })}
            />
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    );
  }
}

ChatForm.propTypes = {
  handleSubmit: PropTypes.func
};

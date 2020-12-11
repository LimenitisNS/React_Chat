import React from "react";
import PropTypes from "prop-types";

export default class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      error: "",
      result: ""
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit({ title: this.state.title });
    this.setState({ title: "" });
  }

  render() {
    return (
      <div className="chatForm">
        <h3>Create chat</h3>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <div>
            <label>Title</label>
            <input
              value={this.state.title}
              name="chat"
              onChange={(event) => this.setState({ title: event.target.value })}
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

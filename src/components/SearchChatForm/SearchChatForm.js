import React from "react";
import PropTypes from "prop-types";

export default class SearchChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit({ title: this.state.title });
    this.setState({ title: "" });
  }

  render() {
    const { title } = this.state;
    return (
      <div className="searchForm">
        <h4>Search chat</h4>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <div>
            <label>Title</label>
            <input
              value={title}
              name="search"
              onChange={(event) => this.setState({ title: event.target.value })}
            />
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

SearchChatForm.propTypes = {
  handleSubmit: PropTypes.func
};

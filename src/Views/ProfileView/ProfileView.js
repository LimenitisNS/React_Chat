import React from "react";
import APIService from "../../APIService";
import styles from "./styles.module.css";

export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    APIService.user
      .profile()
      .then((response) => response.data)
      .then((user) => this.setState({ user }));
  }

  render() {
    return (
      <>
        <h1>Profile user</h1>
        <div className={styles.profile_info}>
          {this.state.user && (
            <>
              <div>Nickname: {this.state.user.nickname}</div>
              <div>Create: {new Date(this.state.user.createdAt).toLocaleString()}</div>
            </>
          )}
        </div>
      </>
    );
  }
}

import React from "react";
import APIService from "../../APIService";
import styles from "./styles.module.css";

export default class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      password: "",
      result: null,
      error: null
    };
  }

  hendleSubmit(event) {
    const { nickname, password } = this.state;

    this.setState({
      result: null,
      error: null
    });

    APIService.auth
      .login({
        nickname: nickname,
        password: password
      })
      .then(() => {
        this.setState({ result: "The user has successfully logged in" });
        setTimeout(() => this.props.history.push("profile"), 2000);
      })
      .catch((error) => this.setState({ error: "Error" + error.response.data.error }));

    event.preventDefault();
  }

  render() {
    const { error, result, nickname, password } = this.state;
    return (
      <>
        <div>
          <h1>Login</h1>
          {error}
          {result}
          <form onSubmit={(e) => this.hendleSubmit(e)}>
            <div className={styles.login}>
              <label>Nickname</label>
              <input
                type="text"
                value={nickname}
                className={styles.login_input}
                onChange={(e) => this.setState({ nickname: e.target.value })}
              />
            </div>
            <div className={styles.login}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
            <button type="submit">Enter</button>
          </form>
        </div>
      </>
    );
  }
}

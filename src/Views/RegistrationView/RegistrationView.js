import React from "react";
import APIService from "../../APIService";
import styles from "./styles.module.css";

export default class RegistrationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      password: "",
      result: null,
      error: null
    };
  }

  handleSubmit(event) {
    const { nickname, password } = this.state;
    this.setState({
      result: null,
      error: null
    });

    APIService.user
      .create({
        nickname: nickname,
        password: password
      })
      .then(() => {
        this.setState({
          result: "User successfully registered"
        });

        setTimeout(() => this.props.history.push("/login"), 2000);
      })
      .catch((error) => this.setState({ error: "Error" + error.response.data.error }));

    event.preventDefault();
  }

  render() {
    const { nickname, password } = this.state;
    return (
      <>
        <h1>Registration</h1>
        {this.state.error}
        {this.state.result}
        <div>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className={styles.registration}>
              <label>Nick</label>
              <input
                type="text"
                value={nickname}
                className={styles.registration_input_nick}
                onChange={(e) => this.setState({ nickname: e.target.value })}
              />
            </div>
            <div className={styles.registration}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                className={styles.registration_input_password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
            <button type="submit">Registration</button>
          </form>
        </div>
      </>
    );
  }
}

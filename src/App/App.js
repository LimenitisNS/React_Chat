import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import LoginView from "../Views/LoginView";
import RegistrationView from "../Views/RegistrationView";
import ChatView from "../Views/ChatView";
import styles from "./styles.module.css";

export default class App extends React.Component {
  render() {
    return (
      <>
        <div className={styles.nav_bar}>
          <Link to={"/login"}>Login</Link>
          <Link to={"/registration"}>Registration</Link>
          <Link to={"/chat"}>Chat</Link>
        </div>

        <Switch>
          <Route path="/login" component={LoginView} />
          <Route path="/registration" component={RegistrationView} />
          <Route path="/chat" component={ChatView} />
          <Redirect from="/" to="/login" />
        </Switch>
      </>
    );
  }
}

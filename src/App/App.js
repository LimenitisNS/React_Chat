import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import LoginView from "@/Views/LoginView";
import RegistrationView from "@/Views/RegistrationView";
import ChatView from "@/Views/ChatView";
import ProfileView from "@/Views/ProfileView";
import styles from "@/App/styles.module.css";
import APIService from "@/APIService";

class PrivateRoute extends React.Component {
  render() {
    const { user, component: Component, componentProps, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(routeProps) =>
          user ? (
            <Component {...componentProps} {...routeProps} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: routeProps.location }
              }}
            />
          )
        }
      />
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      initDone: false
    };
    this.updateAuthState = this.updateAuthState.bind(this);
  }

  componentDidMount() {
    this.updateAuthState();
  }
  updateAuthState() {
    return APIService.user
      .getCurrent()
      .then((response) => response.data)
      .then((user) => this.setState({ user, initDone: true }))
      .catch(() => this.setState({ user: null, initDone: true }));
  }
  logoutHandler() {
    APIService.auth.logout().then(() => {
      this.setState({ user: null });
    });
  }

  render() {
    const { user, initDone } = this.state;

    if (!initDone) {
      return <>Loading...</>;
    }

    return (
      <>
        <div className={styles.nav_bar}>
          {user ? (
            <>
              <Link to="/profile">Профиль {user.nickname}</Link>&nbsp;
              <button onClick={() => this.logoutHandler()}>Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login">Логин</Link>&nbsp;
              <Link to="/registration">Регистрация</Link>&nbsp;
            </>
          )}
        </div>

        <Switch>
          <Route
            path="/login"
            render={(routeProps) => (
              <LoginView updateAuthHandler={this.updateAuthState} {...routeProps} />
            )}
          />
          <Route path="/registration" component={RegistrationView} />
          <PrivateRoute path="/chat/:id" user={user} component={ChatView} />
          <PrivateRoute
            path="/profile"
            user={user}
            component={ProfileView}
            componentProps={{ user }}
          />
          <Redirect exact from="/" to="/profile" />
        </Switch>
      </>
    );
  }
}

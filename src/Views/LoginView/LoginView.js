import React, { useState } from "react";
import APIService from "@/APIService";
import styles from "./styles.module.css";
import { Formik } from "formik";

export default function LoginView({ location, updateAuthHandler, history }) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  function handleSubmit(values) {
    setResult(null);
    setError(null);

    APIService.auth
      .login({
        nickname: values.nickname,
        password: values.password
      })
      .then(() => {
        setResult("The user has successfully logged in");
        setTimeout(() => redirectAfterLogin(), 2000);
      })
      .catch((error) => setError("Error " + error.response.data.error));
  }

  function redirectAfterLogin() {
    const redirectUrl = location.state ? location.state.from.pathname : "/profile";
    updateAuthHandler().then(() => history.push(redirectUrl));
  }

  return (
    <div className="loginForm">
      <h1>Login</h1>
      <div className={styles.error}>{error}</div>
      <div className="result">{result}</div>
      <Formik
        initialValues={{ nickname: "", password: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.nickname) {
            errors.nickname = "Enter a nickname";
          }
          if (!values.password) {
            errors.password = "Enter a password";
          }
          if (values.password.length < 7) {
            errors.password = "The password must be longer than 6 characters";
          }
          if (values.nickname.length < 4) {
            errors.nickname = "The nickname must be longer than 3 characters";
          }

          return errors;
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className={styles.login}>
              <label>Nickname</label>
              <input
                type="text"
                name="nickname"
                value={values.nickname}
                className={styles.login_input}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className={styles.error}>
                {errors.nickname && touched.nickname && errors.nickname}
              </div>
            </div>
            <div className={styles.login}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className={styles.error}>
                {errors.password && touched.password && errors.password}
              </div>
            </div>
            <button type="submit">Enter</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

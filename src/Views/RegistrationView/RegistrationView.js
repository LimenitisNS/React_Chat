import React from "react";
import APIService from "../../APIService";
import styles from "./styles.module.css";
import { Formik } from "formik";

export default class RegistrationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      error: null
    };
  }

  handleSubmit(values) {
    APIService.user
      .create(values)
      .then(() => {
        this.setState({
          result: "User successfully registered"
        });
        setTimeout(() => this.props.history.push("/login"), 2000);
      })
      .catch((error) => this.setState({ error: "Error " + error.response.data.error }));
  }

  render() {
    const { error, result } = this.state;
    return (
      <>
        <h1>Registration</h1>
        <div className={styles.error}>{error}</div>
        {result}
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
            this.handleSubmit(values);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.registration}>
                <label>Nick</label>
                <input
                  type="text"
                  name="nickname"
                  value={values.nickname}
                  className={styles.registration_input_nick}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className={styles.error}>
                  {errors.nickname && touched.nickname && errors.nickname}
                </div>
              </div>
              <div className={styles.registration}>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  className={styles.registration_input_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className={styles.error}>
                  {errors.password && touched.password && errors.password}
                </div>
              </div>
              <button type="submit">Registration</button>
            </form>
          )}
        </Formik>
      </>
    );
  }
}

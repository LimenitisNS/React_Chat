import React from "react";
import styles from "./styles.module.css";
import { Formik } from "formik";

export default class Form extends React.Component {
  constructor() {
    super();
  }

  handleSubmit(values) {
    const newMessage = {
      nickname: values.nickname,
      message: values.message
    };
    this.props.postMessage(newMessage);
  }

  render() {
    return (
      <div className={styles.form_style}>
        <Formik
          initialValues={{ nickname: "", message: "" }}
          validate={(values) => {
            const errors = {};

            if (values.nickname.length < 4) {
              errors.nickname = "The nickname must be longer than 3 characters";
            }

            if (!values.nickname) {
              errors.nickname = "Enter a nickname";
            }
            if (!values.message) {
              errors.message = "Enter a message";
            }

            return errors;
          }}
          onSubmit={(values) => {
            this.handleSubmit(values);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <input
                value={values.nickname}
                type="text"
                name="nickname"
                id="nick"
                className={styles.form_nick_input}
                placeholder="Enter nickname"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className={styles.error}>
                {errors.nickname && touched.nickname && errors.nickname}
              </div>
              <br />
              <textarea
                value={values.message}
                name="message"
                id="message"
                placeholder="Enter your message"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className={styles.error_message}>
                {errors.message && touched.message && errors.message}
              </div>
              <br />
              <button type="submit">Send</button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

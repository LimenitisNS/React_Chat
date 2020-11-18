import React from "react";
import styles from "./styles.module.css";
import { Formik } from "formik";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit(event, values) {
    event.preventDefault();
    this.props.postMessage({
      content: values.content
    });
  }

  render() {
    return (
      <div className={styles.form_style}>
        <Formik
          initialValues={{ content: "" }}
          validate={(values) => {
            const errors = {};

            if (!values.content) {
              errors.content = "Enter a message";
            }

            return errors;
          }}
          onSubmit={(values, event) => {
            this.handleSubmit(event, values);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
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

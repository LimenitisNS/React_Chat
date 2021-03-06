import React from "react";
import styles from "./styles.module.css";
import { Formik } from "formik";

export default function Form({ postMessage }) {
  function handleSubmit(values) {
    postMessage({
      content: values.content
    });
  }

  return (
    <div className={styles.form_style} id="chatFormMessage">
      <Formik
        initialValues={{ content: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.content) {
            errors.content = "Enter a message";
          }

          return errors;
        }}
        onSubmit={(values) => {
          handleSubmit(values);
          values.content = "";
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <input
              value={values.content}
              name="content"
              id="content"
              placeholder="Enter your message"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className={styles.error_message}>
              {errors.content && touched.content && errors.content}
            </div>
            <br />
            <button type="submit">Send</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

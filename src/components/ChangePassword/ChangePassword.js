import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import APIService from "@/APIService";
import { Formik } from "formik";
import styles from "@//components/ChangePassword/styles.module.css";
import Box from "@material-ui/core/Box";

export default function ChangePassword({ open, onClose }) {
  const handleClose = () => {
    onClose();
  };

  function handleSubmit(values) {
    APIService.user
        .changePassword(values.password)
        .then((response) => response.data)
    onClose();
  }

  return (
    <Dialog className={styles.dialog} aria-labelledby="simple-dialog-title" open={open} onClose={handleClose}>
      <DialogTitle id="simple-dialog-title">Change your password</DialogTitle>
      <Formik
        initialValues={{ password: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.password) {
            errors.password = "Enter a password";
          }
          if (values.password.length < 7) {
            errors.password = "The password must be longer than 6 characters";
          }

          return errors;
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
              <Box>
            <TextField
              label="New password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
              </Box>
            <Box className={styles.error}>
              {errors.password && touched.password && errors.password}
            </Box>
              <Box className={styles.submitButton}>
                  <Button variant="contained" type="submit">
                      Change password
                  </Button>
              </Box>
          </form>
        )}
      </Formik>
    </Dialog>
  );
}

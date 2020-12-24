import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import APIService from "@/APIService";
import { Formik } from "formik";
import styles from "@//components/ChangeTitle/styles.module.css";
import Box from "@material-ui/core/Box";

export default function ChangeTitle({ open, onClose, chat }) {
  const handleClose = () => {
    onClose();
  };

  function handleSubmit(values) {
    chat.title = values.title;
    APIService.chat.changeTitle(chat).then(onClose());
  }

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={handleClose}>
      <DialogTitle id="simple-dialog-title">Change chat title</DialogTitle>
      <Formik
        initialValues={{ title: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.title) {
            errors.title = "Enter a title";
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
                label="New title"
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Box>
            <Box className={styles.error}>{errors.title && touched.title && errors.title}</Box>
            <Box className={styles.submitButton}>
              <Button variant="contained" type="submit">
                Change title
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Dialog>
  );
}

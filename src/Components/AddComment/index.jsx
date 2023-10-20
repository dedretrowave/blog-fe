import React from "react";

import { TextField, Avatar, Button } from "@mui/material";

import styles from "./AddComment.scss";

export const Index = () => {
  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{root: styles.avatar}} src="https://mui.com/static/images/avatar/5.jpg"/>
        <div className={styles.form}>
          <TextField
            label="Write a comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant="contained">Post</Button>
        </div>
      </div>
    </>
  )
}
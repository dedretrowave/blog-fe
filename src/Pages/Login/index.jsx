import React from "react";

import {
  Typography,
  TextField,
  Paper,
  Button,
} from "@mui/material";

import styles from "./Login.scss";

export const Login = () => {
  return (
    <Paper classes={{root:styles.root}}>
      <Typography classes={{root:styles.title}} variant="h5">
        Log In
      </Typography>
      <TextField className={styles.field}
                 label="E-Mail"
                 helperText="Wrong e-mail"
                 error
                 fullWidth
      />
      <TextField className={styles.field} label="Password" fullWidth/>
      <Button size="large" variant="contained" fullWidth>
        Log In
      </Button>
    </Paper>
  )
}
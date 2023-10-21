import React from "react";

import {
  Typography,
  TextField,
  Paper,
  Button,
  Avatar
} from "@mui/material";

import styles from "./Register.module.scss";

export const Register = () => {
  return (
    <Paper classes={{root:styles.root}}>
      <Typography classes={{root:styles.title}} variant="h5">
        Create account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{width:100,height:100}}/>
      </div>
      <TextField className={styles.field} label="Full Name" fullWidth/>
      <TextField className={styles.field} label="E-Mail" fullWidth/>
      <TextField className={styles.field} label="Password" fullWidth/>
      <Button size="large" variant="contained" fullWidth>Register</Button>
    </Paper>
  )
}
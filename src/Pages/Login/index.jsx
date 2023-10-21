import React from "react";
import { useForm } from "react-hook-form";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";

import {fetchUser, isLoggedIn} from "../../redux/slices/user";

import {
  Typography,
  TextField,
  Paper,
  Button,
} from "@mui/material";

import styles from "./Login.module.scss";

export const Login = () => {
  const isLogin = useSelector(isLoggedIn);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = (values) => {
    dispatch(fetchUser(values));
  }

  if (isLogin) {
    return <Navigate to="/"/>
  }

  return (
    <Paper classes={{root:styles.root}}>
      <Typography classes={{root:styles.title}} variant="h5">
        Log In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          fullWidth
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          {...register('email', {required: 'Enter e-mail'})}
        />
        <TextField
          className={styles.field}
          label="Password"
          type="password"
          fullWidth
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          {...register('password', {required: 'Enter password'})}
        />
        <Button
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Log In
        </Button>
      </form>
    </Paper>
  )
}
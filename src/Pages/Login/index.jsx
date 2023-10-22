import React from "react";
import { useForm } from "react-hook-form";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";

import { fetchUser, isLoggedIn,  } from "../../redux/slices/user";

import {
  Typography,
  TextField,
  Paper,
  Button,
} from "@mui/material";

import styles from "./Login.module.scss";
import globalSettings from "../../Settings/globalSettings";

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

  const onSubmit = async (values) => {
    const data = await dispatch(fetchUser(values));

    if (data.payload.token) {
      window
        .localStorage
        .setItem(
          globalSettings.LOCAL_STORAGE_TOKEN_PATH,
          data.payload.token
        );
    }
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
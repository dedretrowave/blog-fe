import React from "react";
import {Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {createUser, isLoggedIn} from "../../redux/slices/user";

import {
  Typography,
  TextField,
  Paper,
  Button,
  Avatar,
  Input,
} from "@mui/material";

import styles from "./Register.module.scss";
import axios from "../../Utils/axios";
import globalSettings from "../../Settings/globalSettings";


export const Register = () => {
  const [ avatarUrl, setAvatarUrl ] = React.useState('');

  const dispatch = useDispatch();
  const isRegistered = useSelector(isLoggedIn);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      avatarUrl: '',
    }
  });

  const onSubmit = async (values) => {
    values = {
        ...values,
        avatarUrl: avatarUrl,
    };
    const data = await dispatch(createUser(values));

    if (data.payload?.token) {
        window
            .localStorage
            .setItem(
                globalSettings.LOCAL_STORAGE_TOKEN_PATH,
                data.payload.token,
            );
    }

    if (!data.payload?.success) {
      data.payload.errors.forEach(error => {
        setError(error.path, {
          type: 'custom',
          message: error.msg,
        })
      });
    }
  }

  if (isRegistered) {
      return <Navigate to="/"/>
  }

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    console.log(file);
    formData.append('image', file);
    console.log(formData.get('image'));

    const { data } = await axios.post('/upload', formData);

    setAvatarUrl(data.url);
  }

  return (
    <Paper classes={{root:styles.root}}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography classes={{root:styles.title}} variant="h5">
                Create account
            </Typography>
            <div className={styles.avatar}>
                <Input
                    type="file"
                    onChange={uploadImage}
                />
                <Avatar sx={{width:100,height:100}}/>
            </div>
            <TextField
                className={styles.field}
                label="Full Name"
                error={!!errors.fullName?.message}
                helperText={errors.fullName?.message}
                {...register(
                    'fullName',
                    {required: 'Enter full name',}
                )}
                fullWidth
            />
            <TextField
                className={styles.field}
                label="E-Mail"
                fullWidth
                error={!!errors.email?.message}
                helperText={errors.email?.message}
                {...register(
                    'email',
                    {required: 'Enter e-mail'}
                )}
            />
            <TextField
                className={styles.field}
                label="Password"
                type="password"
                error={!!errors.password?.message}
                helperText={errors.password?.message}
                {...register(
                    'password',
                    {required: 'Enter password'}
                )}
                fullWidth
            />
            <Button
                type="submit"
                size="large"
                variant="contained"
                fullWidth
            >Register</Button>
        </form>
    </Paper>
  )
}
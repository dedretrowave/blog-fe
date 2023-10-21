import React from 'react';
import {useSelector} from "react-redux";
import {getUser, isLoggedIn} from "../../redux/slices/user";
import {UserInfo} from '../UserInfo';

import {Button, Container} from "@mui/material";

import styles from './Header.module.scss';

export const Header = () => {
  const isAuthed = useSelector(isLoggedIn);
  const user = useSelector(getUser);

  const onClickLogout = () => {};

  return (
    <div className={styles.root}>
      <Container maxWidth={"lg"}>
        <div className={styles.inner}>
          <a href="/" className={styles.logo}>
            <div>Blog</div>
          </a>
          <div className={styles.buttons}>
            {isAuthed ? (
              <div style={{display:"flex"}}>
                <UserInfo {...user}/>
                <a href="/posts/create">
                  <Button variant="contained">Write an article</Button>
                </a>
                <Button variant="contained" onClick={onClickLogout} color={"error"}>
                  Log Out
                </Button>
              </div>
            ) : (
              <>
                <a href="/login">
                  <Button variant="outlined">
                    Log In
                  </Button>
                </a>
                <a href="/register">
                  <Button variant="contained">Register</Button>
                </a>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
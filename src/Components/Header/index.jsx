import React from 'react';
import styles from './Header.module.scss';
import {Button, Container} from "@mui/material";

export const Header = () => {
  const isAuthed = false;

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
              <>
                <a href="/posts/create">
                  <Button variant="contained">Write an article</Button>
                </a>
                <Button variant="contained" onClick={onClickLogout} color={"error"}>
                  Log Out
                </Button>
              </>
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
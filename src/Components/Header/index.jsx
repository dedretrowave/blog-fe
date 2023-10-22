import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchToken, getUser, isLoggedIn, logout} from "../../redux/slices/user";
import {UserInfo} from '../UserInfo';

import {Button, Container} from "@mui/material";

import styles from './Header.module.scss';
import globalSettings from "../../Settings/globalSettings";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuthed = useSelector(isLoggedIn);
  const user = useSelector(getUser);

  const isUserLoaded= user.status === 'loaded';

  React.useEffect(() => {
    dispatch(fetchToken());
  },[dispatch]);

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem(globalSettings.LOCAL_STORAGE_TOKEN_PATH);
  };

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
                {isUserLoaded ?
                  <UserInfo {...user.data}/>
                : ""}
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
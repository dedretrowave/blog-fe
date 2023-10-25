import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchToken, getUser} from "../../redux/slices/user";
import axios from "../../Utils/axios";

import { TextField, Avatar, Button } from "@mui/material";

import styles from "./AddComment.module.scss";
import noavatar from "../../Assets/noavatar.jpg";

export const AddComment = ({postId, onAddComment}) => {
  const [ text, setText ] = React.useState('');

  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const isUserLoaded = user.status === 'loaded';

  React.useEffect(() => {
    dispatch(fetchToken());
  }, [dispatch]);

  const onPost = async () => {
    try {
      const body = {
        text: text,
        postId: postId,
      }
      const { data } = await axios.post('/comments', body);

      if (data.success) {
        onAddComment(data.comment);
        setText('');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {isUserLoaded && user.data ? (
      <div className={styles.root}>
        <Avatar
          classes={{root: styles.avatar}}
          src={isUserLoaded && user.data ? user.data.avatarUrl : noavatar}
        />
        <div className={styles.form}>
          <TextField
            label="Write a comment"
            variant="outlined"
            maxRows={10}
            value={text}
            onChange={e => setText(e.target.value)}
            multiline
            fullWidth
          />
          <Button
            onClick={onPost}
            variant="contained"
          >Post</Button>
        </div>
      </div>
        ) :
        (<div></div>)
      }
    </>
  )
}
import React from "react";
import SimpleMDE from 'react-simplemde-editor';

import {
  TextField,
  Paper,
  Button,
} from "@mui/material";

import styles from './AddPost.scss';

export const AddPost = () => {
  const imageUrl = '';
  const [value, setValue] = React.useState('');

  const handleChangeFile = () => {};
  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const options = React.useMemo(() => {
    return {
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Input text...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }
  }, []);

  return (
    <Paper style={{padding:30}}>
      <Button variant="outlined" size="large">
        Upload preview
      </Button>
      <input type="file" onChange={handleChangeFile} hidden/>
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Delete
        </Button>
      )}
      {imageUrl && (
        <img src={`http://localhost:44440{imageUrl}`} alt="Uploaded" className={styles.image}/>
      )}
      <br/>
      <br/>
      <TextField
        classes={{root:styles.title}}
        variant="standard"
        placeholder="Article title"
        fullWidth
      />
      <TextField classes={{root: styles.tags}} variant="standard" placeholder="Tags" fullWidth/>
      <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options}/>
      <div className={styles.buttons}>
        <Button size="large" variant="contained">
          Post
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  )
}
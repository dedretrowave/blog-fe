import React from 'react';
import {useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import axios from "../../Utils/axios";

export const AddPost = () => {
  const navigateTo = useNavigate();
  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const inputFileRef = React.useRef(null);


  const handleChangeFile = async (event) => {
    try {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        const { data } = await axios.post('/upload', formData);

        setImageUrl(data.url);
    } catch(err) {
      console.log(err);
    }
  };

  const onClickRemoveImage = () => {
      setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      const body = {
        title,
        imageUrl,
        tags,
        text,
      }

      const {data} = await axios.post('/posts', body);

      if (data.success) {
        const id = data.post._id;

        navigateTo(`/posts/${id}`);
      }
    } catch (err) {
        console.log(err);
    }
  }

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        variant="outlined"
        size="large"
        onClick={() => inputFileRef.current.click()}
      >
        Загрузить превью
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img
            className={styles.image}
            src={imageUrl}
            alt="Uploaded"
        />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        fullWidth
        value={tags}
        onChange={e => setTags(e.target.value)}
      />
      <SimpleMDE
          className={styles.editor}
          value={text}
          onChange={onChange}
          options={options}
      />
      <div className={styles.buttons}>
        <Button
            onClick={onSubmit}
            type="submit"
            size="large"
            variant="contained"
        >
          Опубликовать
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
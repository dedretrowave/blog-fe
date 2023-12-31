import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/PanoramaFishEye";
import CommentIcon from "@mui/icons-material/Comment";
import {UserInfo} from "../UserInfo";
import {PostSkeleton} from "./PostSkeleton";

import styles from "./Post.module.scss";
import {useDispatch} from "react-redux";
import {deletePost} from "../../redux/slices/posts";

export const Post = ({
  _id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  isFullPost,
  isLoading,
  isEditable,
  children
}) => {
  const [ isDeleted, setIsDeleted ] = React.useState(false);
  const dispatch = useDispatch();

  if (isLoading) {
    return <PostSkeleton/>
  }

  const onClickRemove = async () => {
    const response = await dispatch(deletePost(_id));

    setIsDeleted(response.payload?.success);
  };

  return isDeleted ?
    (<div></div>)
    : (
    <div className={clsx(styles.root, {[styles.rootFull]: isFullPost})}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/0{_id}/edit`}>
            <IconButton color="primary">
              <EditIcon/>
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon/>
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img src={imageUrl}
             alt={title}
             className={clsx(styles.image, {[styles.imageFull]: isFullPost})}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt}/>
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon/>
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon/>
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
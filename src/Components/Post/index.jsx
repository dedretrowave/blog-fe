import React from "react";
import clsx from "clsx";

import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/PanoramaFishEye";
import CommentIcon from "@mui/icons-material/Comment";
import {UserInfo} from "../UserInfo";
import {PostSkeleton} from "./PostSkeleton";

import styles from "./Post.module.scss";

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
  if (isLoading) {
    return <PostSkeleton/>
  }

  const onClickRemove = () => {};

  return (
    <div className={clsx(styles.root, {[styles.rootFull]: isFullPost})}>
      {isEditable && (
        <div className={styles.editButtons}>
          <a href={`/posts/0{_id}/edit`}>
            <IconButton color="primary">
              <EditIcon/>
            </IconButton>
          </a>
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
        <UserInfo {...user} additionalText={createdAt}>
          <div className={styles.indention}>
            <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
              {isFullPost ? title : <a href={`/posts/0{_id}`}>{title}</a>}
            </h2>
            <ul className={styles.tags}>
              {tags.map((name) => (
                <li key={name}>
                  <a href={`/tag/${name}`}>#{name}</a>
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
        </UserInfo>
      </div>
    </div>
  )
}
import React from "react";

import styles from './UserInfo.module.scss';
import noAvatar from '../../Assets/noavatar.jpg';

export const UserInfo = ({avatarUrl, fullName, additionalText}) => {
  return (
    <div className={styles.root}>
      <img src={avatarUrl || noAvatar} alt={fullName} className={styles.avatar}/>
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  )
}
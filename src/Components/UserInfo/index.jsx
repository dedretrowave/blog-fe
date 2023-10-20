import React from "react";
import styles from './UserInfo.scss';

export const UserInfo = ({avatarUrl, fullName, additionalText}) => {
  return (
    <div className={styles.root}>
      <img src={avatarUrl || '/noavatar.png'} alt={fullName} className={styles.avatar}/>
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  )
}
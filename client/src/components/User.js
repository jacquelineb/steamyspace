import React from 'react';
import styles from '../styles/User.module.scss';

function User({ user, isPrivate }) {
  const { realName, location } = user.personalInfo;
  return (
    <div className={styles.profileSummary}>
      <p className={styles.username}>{user.username}</p>
      <div className={styles.mainContent}>
        <img src={user.avatar} alt='User avatar' />

        <div className={styles.userDescription}>
          {isPrivate ? (
            <p>Add this user to find out more.</p>
          ) : !realName && !location ? (
            <p>No information given.</p>
          ) : (
            <div>
              <p>{realName}</p>
              <p>{location}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default User;

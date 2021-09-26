import React from 'react';
import styles from '../styles/ProfileStatus.module.scss';

function ProfileStatus({ profileVisibility, userStatus, gameStatus, username }) {
  return (
    <div className={styles.profileStatus}>
      {profileVisibility !== 3 ? (
        <p>This profile is set to private.</p>
      ) : gameStatus ? (
        <p>
          {username} is currently playing {gameStatus}
        </p>
      ) : userStatus === 0 ? (
        <p>{username} is currently offline</p>
      ) : (
        <p>{username} is currently online</p>
      )}
    </div>
  );
}

export default ProfileStatus;

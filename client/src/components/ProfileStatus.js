import React from 'react';
import styles from '../styles/ProfileStatus.module.scss';

function ProfileStatus({ isPrivate, activity, username }) {
  return (
    <div className={styles.profileStatus}>
      {isPrivate ? (
        <p>This profile is set to private.</p>
      ) : activity.game ? (
        <p>
          {username} is currently playing {activity.game}.
        </p>
      ) : (
        <p>
          {username} is {activity.status}.
        </p>
      )}
    </div>
  );
}

export default ProfileStatus;

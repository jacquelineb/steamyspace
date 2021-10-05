import React from 'react';
import styles from '../styles/ActivityStatus.module.scss';

function ActivityStatus({ isPrivate, activity, username }) {
  return (
    <div className={styles.status}>
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

export default ActivityStatus;

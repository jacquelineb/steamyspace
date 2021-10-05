import React from 'react';
import withContentContainer from './HOC/withContentContainer';
import styles from '../styles/UserGroups.module.scss';

function UserGroups({ groups }) {
  if (!groups) {
    return null;
  }

  return (
    <div className={styles.groups}>
      {groups.map((group, idx) => {
        return (
          <div className={styles.group} key={idx}>
            <div className={styles.groupDescription}>
              <p className={styles.name}>{group.name}</p>
              <p className={styles.memberCount}>{group.memberCount}</p>
            </div>
            <div className={styles.avatarContainer}>
              <img
                className={styles.avatar}
                src={group.avatar}
                alt={`avatar for the group '${group.name}"`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default withContentContainer(UserGroups, 'Groups', true);

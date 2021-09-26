import React from 'react';
import styles from '../styles/ProfileSummary.module.scss';
import formatDate from '../utils/formatDate';

function ProfileSummary({ userSummary }) {
  let userStatus;
  switch (userSummary.personaState) {
    case 0:
      userStatus = 'Offline';
      break;
    case 1:
      userStatus = 'Active';
      break;
    case 3:
      userStatus = 'Away';
      break;
    default:
      userStatus = 'Unavailable';
  }
  return (
    <div className={styles.profileSummary}>
      <p className={styles.username}>{userSummary.nickname}</p>
      <div className={styles.mainContent}>
        <img src={userSummary.avatar.large} alt='User avatar' />
        <div className={styles.userDescription}>
          {userSummary.realName ? (
            <p className={styles.realName}>{userSummary.realName}</p>
          ) : null}
          <div className={styles.location}>
            {userSummary.cityID ? <span>Location: {userSummary.cityID},</span> : null}
            {userSummary.stateCode ? <span>{userSummary.stateCode}, </span> : null}
            {userSummary.countryCode ? <span>{userSummary.countryCode}</span> : null}
          </div>
          <div className={styles.userStatus}>
            <p>Status: {userStatus}</p>
            {userStatus === 'Offline' ? (
              <>
                <p>Last online:</p>
                <p>{formatDate(userSummary.lastLogOff)}</p>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSummary;

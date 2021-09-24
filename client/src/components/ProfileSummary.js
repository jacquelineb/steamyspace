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
      userStatus = 'Online';
      break;
    case 3:
      userStatus = 'Away';
      break;
    default:
      userStatus = 'Unavailable';
  }
  return (
    <div className={styles.profileSummary}>
      <div>
        <p className={styles.username}>{userSummary.nickname}</p>
        <img src={userSummary.avatar.large} alt='user avatar' />
      </div>
      <div className={styles.basicInfo}>
        {userSummary.realName ? <p>{userSummary.realName}</p> : null}
        <div className={styles.location}>
          {userSummary.cityID ? <span>{userSummary.cityID},</span> : null}
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
        {/*userSummary.personaState === 0 ? <p>Offline</p> : <p>Online</p>*/}
      </div>
    </div>
  );
}

export default ProfileSummary;

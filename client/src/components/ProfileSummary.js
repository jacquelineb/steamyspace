import React from 'react';
import styles from '../styles/ProfileSummary.module.scss';

function ProfileSummary({ userSummary }) {
  return (
    <div className={styles.profileSummary}>
      <div>
        <p>{userSummary.nickname}</p>
        <img src={userSummary.avatar.large} alt='user avatar' />
      </div>
      <div className={styles.basicInfo}>
        {userSummary.realName ? <p>{userSummary.realName}</p> : null}
        {userSummary.cityID ? <p>{userSummary.cityID},</p> : null}
        {userSummary.stateCode ? <p>{userSummary.stateCode},</p> : null}
        {userSummary.countryCode ? <p>{userSummary.countryCode}</p> : null}
        {/*userSummary.personaState === 0 ? <p>Offline</p> : <p>Online</p>*/}
      </div>
    </div>
  );
}

export default ProfileSummary;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileSummary from './ProfileSummary';
import ProfileStatus from './ProfileStatus';
import RecentGamesSection from './RecentGamesSection';
import SteamcommunityUrl from './SteamcommunityUrl';
import Blurbs from './Blurbs';
import UserLinks from './UserLinks';
import UserGroups from './UserGroups';
import styles from '../styles/Profile.module.scss';

function Profile() {
  const [userSummary, setUserSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let { pathname } = useLocation();

  useEffect(() => {
    async function getUserSummary() {
      try {
        const response = await fetch(`http://localhost:5000${pathname}`);
        console.log(response.status);
        if (response.status === 200) {
          setUserSummary(await response.json());
        } else {
          setUserSummary(undefined);
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
    getUserSummary();
  }, [pathname]);

  if (isLoading) {
    return null;
  }

  if (!userSummary) {
    return <h1>you should redirect to a 404 page or something</h1>;
  }

  return (
    <div className={styles.profileContainer}>
      <ProfileContentLeft userSummary={userSummary} />
      <ProfileContentRight userSummary={userSummary} />
    </div>
  );
}

function ProfileContentLeft({ userSummary }) {
  return (
    <div className={styles.profileContentLeft}>
      <ProfileSummary userSummary={userSummary} />
      <SteamcommunityUrl url={userSummary.url} />
      {userSummary.visibilityState === 3 ? (
        <>
          <UserLinks baseUrl={userSummary.url} />
          <UserGroups
            steamUserId={userSummary.steamID}
            primaryGroupId={userSummary.primaryGroupID}
          />
        </>
      ) : null}
    </div>
  );
}

function ProfileContentRight({ userSummary }) {
  return (
    <div className={styles.profileContentRight}>
      <ProfileStatus
        profileVisibility={userSummary.visibilityState}
        userStatus={userSummary.personaState}
        gameStatus={userSummary.gameExtraInfo}
        username={userSummary.nickname}
      />
      {userSummary.visibilityState === 3 ? (
        <>
          <RecentGamesSection steamUserId={userSummary.steamID} />
          <Blurbs username={userSummary.nickname} />
        </>
      ) : null}
    </div>
  );
}

export default Profile;

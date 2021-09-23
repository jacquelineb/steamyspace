import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileSummary from './ProfileSummary';
import ProfileStatus from './ProfileStatus';
import RecentGamesSection from './RecentGamesSection';

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

  console.log(userSummary.visibilityState);

  return (
    <div>
      <ProfileSummary userSummary={userSummary} />
      <ProfileStatus
        profileVisibility={userSummary.visibilityState}
        userStatus={userSummary.personaState}
        gameStatus={userSummary.gameExtraInfo}
      />
      <RecentGamesSection steamUserId={userSummary.steamID} />
    </div>
  );
}

export default Profile;

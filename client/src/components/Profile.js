import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import User from './User';
import ProfileStatus from './ProfileStatus';
import RecentGamesSection from './RecentGamesSection';
import SteamcommunityUrl from './SteamcommunityUrl';
import Blurbs from './Blurbs';
import UserLinks from './UserLinks';
import UserGroups from './UserGroups';
import Comments from './Comments';
import FriendSpace from './FriendSpace';
import styles from '../styles/Profile.module.scss';
import { steamProfileParser, steamCommentsParser } from '../utils/steamProfileParser';

function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [steamProfile, setSteamProfile] = useState();
  const [commentsPageNum, setCommentsPageNum] = useState(1);
  const [comments, setComments] = useState([]);
  let { pathname } = useLocation();

  useEffect(() => {
    (async function getSteamProfile() {
      try {
        const response = await fetch(`http://localhost:5000${pathname}`);
        const profileData = await response.json();
        const sp = steamProfileParser(profileData);
        setSteamProfile(sp);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    })();
  }, [pathname]);

  useEffect(() => {
    if (steamProfile && !steamProfile.isPrivate()) {
      (async function getSteamProfileComments() {
        try {
          const response = await fetch(
            `http://localhost:5000${pathname}/comments/${commentsPageNum}`
          );
          const commentsData = await response.json();
          //console.log(steamCommentsParser(commentsData));
          setComments(steamCommentsParser(commentsData));
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [steamProfile, pathname, commentsPageNum]);

  if (isLoading) {
    return null;
  }

  if (!steamProfile) {
    return <h1>you should redirect to a 404 page or something</h1>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContentLeft}>
        <User user={steamProfile.getUser()} isPrivate={steamProfile.isPrivate()} />
        <SteamcommunityUrl url={`https://steamcommunity.com${pathname}`} />
        {steamProfile.isPrivate() ? null : (
          <>
            <UserLinks />
            <UserGroups groups={steamProfile.getGroups()} />
          </>
        )}
      </div>

      <div className={styles.profileContentRight}>
        <ProfileStatus
          isPrivate={steamProfile.isPrivate()}
          username={steamProfile.getUser().username}
          activity={steamProfile.getActivity()}
        />
        {steamProfile.isPrivate() ? null : (
          <>
            <RecentGamesSection games={steamProfile.getRecentGames()} />
            <Blurbs aboutMe={steamProfile.getSummary()} />
            <FriendSpace friendData={steamProfile.getTopFriendsSection()} />
            <Comments
              commentsList={comments}
              totalNumComments={steamProfile.getCommentCount()}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;

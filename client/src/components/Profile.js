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
  let { pathname } = useLocation();

  const [user, setUser] = useState();
  const [userStatus, setUserStatus] = useState();
  const [profileIsPrivate, setProfileIsPrivate] = useState(true);
  const [groups, setGroups] = useState([]);
  const [recentGames, setRecentGames] = useState();
  const [aboutMe, setAboutMe] = useState();
  const [topFriends, setTopFriends] = useState();
  const [friendCount, setFriendCount] = useState();
  const [profileNotExist, setProfileNotExist] = useState(false);
  const [steamProfileUrl, setSteamProfileUrl] = useState('');

  const [totalNumComments, setTotalNumComments] = useState();
  const [commentsPageNum, setCommentsPageNum] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async function getSteamProfile() {
      try {
        const response = await fetch(`http://localhost:5000${pathname}`);
        const profileData = await response.json();
        const steamProfile = steamProfileParser(profileData);
        if (steamProfile) {
          setUser(steamProfile.getUser());
          setGroups(steamProfile.getGroups());
          setProfileIsPrivate(steamProfile.isPrivate());
          setSteamProfileUrl(`https://steamcommunity.com${pathname}`);
          setUserStatus(steamProfile.getActivity());
          setRecentGames(steamProfile.getRecentGames());
          setAboutMe(steamProfile.getSummary());
          setTopFriends(steamProfile.getTopFriends());
          setFriendCount(steamProfile.getFriendCount());

          setTotalNumComments(steamProfile.getCommentCount());
        } else {
          setProfileNotExist(true);
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    })();
  }, [pathname]);

  useEffect(() => {
    if (!profileNotExist && !profileIsPrivate) {
      (async function getSteamProfileComments() {
        try {
          const response = await fetch(
            `http://localhost:5000${pathname}/comments/${commentsPageNum}`
          );
          const commentsData = await response.json();
          setComments(steamCommentsParser(commentsData));
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [commentsPageNum, profileNotExist, pathname, profileIsPrivate]);

  if (isLoading) {
    return null;
  }

  if (profileNotExist) {
    return <h1>you should redirect to a 404 page or something</h1>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={`${styles.profileContentLeft} ${styles.contentColumn}`}>
        <User user={user} isPrivate={profileIsPrivate} />
        <SteamcommunityUrl url={steamProfileUrl} />
        {profileIsPrivate ? null : (
          <>
            <UserLinks baseUrl={steamProfileUrl} />
            {groups && <UserGroups groups={groups} />}
          </>
        )}
      </div>

      <div className={`${styles.profileContentRight} ${styles.contentColumn}`}>
        <ProfileStatus
          isPrivate={profileIsPrivate}
          username={user.username}
          activity={userStatus}
        />
        {profileIsPrivate ? null : (
          <>
            <RecentGamesSection games={recentGames} />
            <Blurbs aboutMe={aboutMe} />
            {friendCount > 0 && (
              <FriendSpace username={user.username} top={topFriends} totalCount={friendCount} />
            )}
            <Comments commentsList={comments} totalCount={totalNumComments} />
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/FriendSpace.module.scss';
import withContentContainer from './HOC/withContentContainer';

function FriendSpace({ friendData }) {
  return (
    <div>
      <p>Blahalsdjf;asjdf has {friendData.totalFriends} Friends</p>
      <div className={styles.topFriends}>
        {friendData.topFriends.map((topFriend, idx) => {
          return (
            <div className={styles.topFriend} key={idx}>
              <Link className={styles.topFriendLink} to={`${topFriend.profileUrl.substr(26)}`}>
                <p className={styles.username}>{topFriend.username}</p>
                <img className={styles.friendAvatar} src={topFriend.avatar} alt='user avatar' />
              </Link>
            </div>
          );
        })}
      </div>
      <a href='#'>View all of replace this's Friends</a>
    </div>
  );
}

FriendSpace.displayName = 'Friends';
export default withContentContainer(FriendSpace);

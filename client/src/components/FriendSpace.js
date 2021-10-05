import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/FriendSpace.module.scss';
import withContentContainer from './HOC/withContentContainer';

function FriendSpace({ username, top, totalCount }) {
  return (
    <div>
      <p className={styles.countDescriptor}>
        {username} has <span className={styles.count}>{totalCount}</span> friends.
      </p>
      <div className={styles.topFriends}>
        {top.map((topFriend, idx) => {
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
      <div className={styles.viewAllFriendsContainer}>
        <a className={styles.viewFriendsLink} href='#'>
          View All of {username}'s Friends
        </a>
      </div>
    </div>
  );
}

export default withContentContainer(FriendSpace, 'Friends');

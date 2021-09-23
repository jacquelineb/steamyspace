import React from 'react';

function ProfileStatus({ profileVisibility, userStatus, gameStatus }) {
  return (
    <div>
      {profileVisibility !== 3 ? (
        <p>This profile is set to private.</p>
      ) : gameStatus ? (
        <p>Currently Playing {gameStatus}</p>
      ) : userStatus === 0 ? (
        <p>Currently Offline</p>
      ) : (
        <p>Currently Online</p>
      )}
    </div>
  );
}

export default ProfileStatus;

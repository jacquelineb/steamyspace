import React from 'react';
import styles from '../styles/SteamcommunityUrl.module.scss';

function SteamcommunityUrl({ url }) {
  return (
    <div className={styles.steamcommunityUrl}>
      <p>Steamcommunity URL:</p>
      <a href={url}>{url}</a>
    </div>
  );
}

export default SteamcommunityUrl;

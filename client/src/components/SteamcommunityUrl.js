import React from 'react';
import styles from '../styles/SteamcommunityUrl.module.scss';

function SteamcommunityUrl({ url }) {
  return (
    <div className={styles.steamcommunityUrl}>
      <p className={styles.header}>Steamcommunity URL:</p>
      <a className={styles.url} href={url}>
        {url}
      </a>
    </div>
  );
}

export default SteamcommunityUrl;

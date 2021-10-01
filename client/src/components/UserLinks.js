import React from 'react';
import styles from '../styles/UserLinks.module.scss';
import withContentContainer from './HOC/withContentContainer';

function UserLinks({ baseUrl }) {
  return (
    <div className={styles.linksContainer}>
      <div className={styles.linksLeft}>
        <ul>
          <li>
            <a href={`${baseUrl}/games/?tab=all`}>Games</a>
          </li>
          <li>
            <a href={`${baseUrl}/inventory`}>Inventory</a>
          </li>
          <li>
            <a href={`${baseUrl}/myworkshopfiles/?section=guides`}>Guides</a>
          </li>
          <li>
            <a href={`${baseUrl}/recommended`}>Reviews</a>
          </li>
        </ul>
      </div>
      <div className={styles.linksRight}>
        <ul>
          <li>
            <a href={`${baseUrl}/screenshots`}>Screenshots</a>
          </li>
          <li>
            <a href={`${baseUrl}/myworkshopfiles`}>Workshop Items</a>
          </li>
          <li>
            <a href={`${baseUrl}/videos`}>Videos</a>
          </li>
          <li>
            <a href={`${baseUrl}/images`}>Artwork</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
UserLinks.displayName = 'Links';
export default withContentContainer(UserLinks, 'box');

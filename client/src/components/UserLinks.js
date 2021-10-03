import React from 'react';
import styles from '../styles/UserLinks.module.scss';
import withContentContainer from './HOC/withContentContainer';

const PATHS = [
  {
    name: 'Games',
    path: '/games/?tab=all',
  },
  {
    name: 'Inventory',
    path: '/inventory',
  },
  {
    name: 'Guides',
    path: '/myworkshopfiles/?section=guides',
  },
  {
    name: 'Reviews',
    path: '/recommended',
  },
  {
    name: 'Screenshots',
    path: '/screenshots',
  },
  {
    name: 'Workshop Items',
    path: '/myworkshopfiles',
  },
  {
    name: 'Videos',
    path: '/videos',
  },
  {
    name: 'Artwork',
    path: '/images',
  },
];

function UserLinks({ baseUrl }) {
  return (
    <div className={styles.linksContainer}>
      <div className={styles.linksLeft}>
        {PATHS.slice(0, PATHS.length / 2).map((pathObj) => {
          return (
            <div className={styles.linkContainer}>
              <a className={styles.link} href={`${baseUrl}${pathObj.path}`}>
                {pathObj.name}
              </a>
            </div>
          );
        })}
      </div>
      <div className={styles.linksRight}>
        {PATHS.slice(PATHS.length / 2).map((pathObj) => {
          return (
            <div className={styles.linkContainer}>
              <a className={styles.link} href={`${baseUrl}${pathObj.path}`}>
                {pathObj.name}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
UserLinks.displayName = 'Links';
export default withContentContainer(UserLinks, 'box');

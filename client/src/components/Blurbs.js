import React from 'react';
import styles from '../styles/Blurbs.module.scss';

function Blurbs({ username }) {
  return (
    <div>
      <h1 className={styles.mainHeader}>{username}'s Blurbs</h1>
      <h2 className={styles.subHeader}>About me:</h2>
      <p>No information given.</p>
    </div>
  );
}

export default Blurbs;

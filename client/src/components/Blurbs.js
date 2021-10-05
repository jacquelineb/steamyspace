import React from 'react';
import styles from '../styles/Blurbs.module.scss';
import withContentContainer from './HOC/withContentContainer';

function Blurbs({ aboutMe }) {
  return (
    <div className={styles.aboutSection}>
      <span className={styles.subHeader}>About me:</span>
      <p dangerouslySetInnerHTML={{ __html: `${aboutMe}` }} />
    </div>
  );
}

export default withContentContainer(Blurbs, 'Blurbs');

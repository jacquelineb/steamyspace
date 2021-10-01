import React from 'react';
import styles from '../styles/Blurbs.module.scss';
import withContentContainer from './HOC/withContentContainer';

function Blurbs({ aboutMe }) {
  return (
    <div>
      <p className={styles.subHeader}>About me:</p>
      <p dangerouslySetInnerHTML={{ __html: `${aboutMe}` }}></p>
    </div>
  );
}

Blurbs.displayName = 'Blurbs';
//export default Blurbs;
export default withContentContainer(Blurbs);

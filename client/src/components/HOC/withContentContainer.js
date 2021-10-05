import React from 'react';
import styles from '../../styles/ContentContainer.module.scss';

function withContentContainer(WrappedComponent, contentName, withBox = false) {
  return (props) => (
    <div className={withBox ? styles.boxed : styles.noBox}>
      <p className={styles.header}>My {contentName}</p>
      <div className={styles.mainContent}>
        <WrappedComponent {...props} />
      </div>
    </div>
  );
}

export default withContentContainer;

import React from 'react';
import styles from '../../styles/ContentContainer.module.scss';

const withContentHeader = (WrappedComponent) => {
  return (props) => (
    <div className={styles.box}>
      {console.log(props)}
      <p className={styles.boxHeader}>My {WrappedComponent.displayName}</p>
      <WrappedComponent />
    </div>
  );
};

export default withContentHeader;

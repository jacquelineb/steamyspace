import React from 'react';
import styles from '../../styles/ContentContainer.module.scss';

const withContentContainer = (WrappedComponent, containerStyle) => {
  console.log(WrappedComponent);
  return (props) => (
    <div className={containerStyle === 'box' ? styles.box : null}>
      <p className={containerStyle === 'box' ? styles.boxHeader : styles.sectionHeader}>
        My {WrappedComponent.displayName}
      </p>
      <div className={styles.mainContent}>
        <WrappedComponent {...props} />
      </div>
    </div>
  );
};

export default withContentContainer;

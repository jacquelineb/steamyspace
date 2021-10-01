import React from 'react';
import styles from '../../styles/ContentContainer.module.scss';

const withContentContainer = (WrappedComponent, containerStyle) => {
  return (props) => (
    <div className={containerStyle === 'box' ? styles.box : null}>
      {/*console.log(props)*/}
      <p className={containerStyle === 'box' ? styles.boxHeader : styles.sectionHeader}>
        My {WrappedComponent.displayName}
      </p>
      <WrappedComponent {...props} />
    </div>
  );
};

export default withContentContainer;

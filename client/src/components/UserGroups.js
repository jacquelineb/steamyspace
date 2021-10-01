import React from 'react';
import withContentContainer from './HOC/withContentContainer';

const UserGroups = () => {
  return <div>list groups</div>;
};

UserGroups.displayName = 'Groups';
export default withContentContainer(UserGroups, 'box');

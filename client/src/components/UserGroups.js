import React from 'react';
import withContentHeader from './HOC/withContentHeader';

const UserGroups = ({ username }) => {
  return <div>list groups</div>;
};

UserGroups.displayName = 'Groups';
export default withContentHeader(UserGroups);
//export default UserGroups;

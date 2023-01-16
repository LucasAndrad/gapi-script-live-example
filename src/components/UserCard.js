import React from 'react';

export const UserCard = (props) => {
  return (
    <div>
      <h2>{props.user.name}</h2>
      <img referrerPolicy="no-referrer" src={props.user.profileImg} alt="user profile" />
    </div>
  );
}

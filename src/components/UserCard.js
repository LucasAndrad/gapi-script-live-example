import React from 'react';

const UserCard = (props) => {
  return (
    <div>
      <h2>{props.user.name}</h2>
      <img src={props.user.profileImg} alt="user profile" />
    </div>
  );
}

export default UserCard;

import React from 'react';
import UserProfileForm from '../components/user/UserProfileForm';

const UserAdditionalData = () => {
  return (
    <div className="user-additional-data-page">
      <h2>Additional Information</h2>
      <p className="lead">
        We just need a little more information about you before we get started.
      </p>

      <UserProfileForm />
    </div>
  );
};

export default UserAdditionalData;
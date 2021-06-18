import React from 'react';
import AccountSettingsSidebar from '../user/account/AccountSettingsSidebar';
import AccountSettingsContainer from '../user/account/AccountSettingsContainer';

const AccountSettingsLayout = ({
  children
}) => {
  return (
    <main className="main position-relative">
      <AccountSettingsSidebar />
      <AccountSettingsContainer>
        { children }
      </AccountSettingsContainer>
    </main>
  );
};

export default AccountSettingsLayout;
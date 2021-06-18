import React from 'react';
import styled from 'styled-components';

const AccountSettingsContainer = ({
  children
}) => {
  return (
    <Wrapper>
      { children }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.layouts.account.sidebar.width };
  width: ${({ theme }) => `calc(100vw - ${ theme.layouts.account.sidebar.width })`};
  padding: 50px;
`;

export default AccountSettingsContainer;
import React from 'react';
import styled from 'styled-components';
import ConnectedAccountDisplay from './ConnectedAccountDisplay';
import appConfig from '../../../config/appConfig';
import { useSelector } from 'react-redux';

const ConnectedAccounts = () => {
  const connectedAccounts = useSelector(state => state.auth.connectedAccounts);
  const token = useSelector(state => state.auth.token);
  const supportedProviders = [
    {
      name: 'LinkedIn',
      identifier: 'linkedIn'
    },
    {
      name: 'Discord',
      identifier: 'discord'
    },
    {
      name: 'Google',
      identifier: 'google-oauth2'
    }
  ];

  const buildAuthorizeUrl = provider => {
    return `${ appConfig.auth0AuthorizeUrl }?connection=${ provider }&response_type=token&client_id=${ appConfig.auth0ClientId }&redirect_uri=${ appConfig.redirectUrl }&access_token=${ token }`;
  };

  const redirectToAuthorizeLink = authorizeLink => {
    localStorage.setItem('primary_account_access_token', token);
    window.location.href = authorizeLink;
  };

  return (
    <Wrapper>
      {
        supportedProviders.map(provider => (
          <ConnectedAccountDisplay
            provider={ provider.name }
            isConnected={ connectedAccounts?.find(connectedAccount => connectedAccount.provider === provider.name) }
            handleConnect={ () => redirectToAuthorizeLink(buildAuthorizeUrl(provider.identifier)) }
          />
        ))
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export default ConnectedAccounts;
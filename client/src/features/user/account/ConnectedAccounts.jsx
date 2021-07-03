import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ConnectedAccountDisplay from './ConnectedAccountDisplay';
import appConfig from '../../../config/appConfig';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../../auth/auth.service';
import useAuth from '../../auth/useAuth';
import axios from 'axios';

const ConnectedAccounts = () => {
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const {
    user,
    loginWithPopup,
    getIdTokenClaims,
    getAccessTokenSilently
  } = useAuth();

  const dispatch = useDispatch();
  const supportedProviders = [
    {
      name: 'LinkedIn',
      identifier: 'linkedin'
    },
    {
      name: 'Discord',
      identifier: 'discord'
    },
    {
      name: 'Google',
      identifier: 'google-oauth2'
    },
    {
      name: 'Facebook',
      identifier: 'facebook'
    }
  ];

  const showAuthorizePopup = async provider => {
    const accessToken = await getAccessTokenSilently({
      scope: 'openid update:current_user_metadata update:current_user_identities',
      audience: appConfig.auth0.audience
    });

    authService.setPrimaryAccountUserId(user?.sub);
    const authResult = await loginWithPopup({
      scope: 'openid',
      max_age: 0,
      connection: provider,
      redirect_uri: appConfig.siteUrl
    });

    console.log('authResult: ', authResult);

    const claims = await getIdTokenClaims();

    await authService.linkUserAccounts(
      authService.getPrimaryAccountUserId(),
      accessToken,
      claims.__raw
    );
  };

  useEffect(() => {
    const getProviders = async () => {

      const fullUser = await axios.get(`${ appConfig.auth0.apiUrl }users/${ user.sub }`, {
        headers: {
          Authorization: `Bearer ${ appConfig.auth0.managementApiToken }`,
          'Content-Type': 'application/json'
        }
      });

      const providers = fullUser.data.identities?.map(ident => ident.connection);
      setConnectedAccounts(providers);
    };

    getProviders();
  }, [user, dispatch]);


  return (
    <Wrapper>
      {
        supportedProviders.map(provider => (
          <ConnectedAccountDisplay
            key={provider.identifier}
            provider={ provider.name }
            isConnected={ connectedAccounts?.find(connectedAccount => connectedAccount === provider.identifier) }
            handleConnect={ () => showAuthorizePopup(provider.identifier) }
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
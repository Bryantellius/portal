const serverUrl = 'http://localhost:3000';

const appConfig = {
  serverUrl: serverUrl,
  apiRoot: `${ serverUrl }/api`,
  apiTimeout: 10000,
  auth0Domain: 'truecoders.us.auth0.com',
  auth0ClientId: 'WDPfxZymuVSBRpOaBYSZQvTBbSHGHFaV',
  auth0ApiUrl: 'https://truecoders.us.auth0.com/api/v2/',
  auth0Container: 'auth0-login-container',
  redirectUrl: serverUrl
};

export default appConfig;
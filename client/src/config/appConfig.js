const serverUrl = 'https://portal.truecoders.io:3000';

const appConfig = {
  serverUrl: serverUrl,
  apiRoot: `${ serverUrl }/api`,
  apiTimeout: 10000,
  auth0Domain: 'truecoders.us.auth0.com',
  auth0ClientId: 'WDPfxZymuVSBRpOaBYSZQvTBbSHGHFaV',
  auth0ApiUrl: 'https://truecoders.us.auth0.com/api/v2/',
  auth0Container: 'auth0-login-container',
  redirectUrl: serverUrl,
  apiUrl: 'https://portal.truecoders.io:3001'
};

export default appConfig;
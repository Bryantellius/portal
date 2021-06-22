const serverUrl = 'https://portal.truecoders.io:3000';

const appConfig = {
  siteUrl: 'https://portal.truecoders.io:3000',
  serverUrl: serverUrl,
  apiRoot: `${ serverUrl }/api`,
  apiTimeout: 10000,
  auth0Domain: 'truecoders.us.auth0.com',
  auth0ClientId: 'WDPfxZymuVSBRpOaBYSZQvTBbSHGHFaV',
  auth0ApiUrl: 'https://truecoders.us.auth0.com/api/v2/',
  auth0AuthorizeUrl: 'https://truecoders.us.auth0.com/authorize',
  auth0Container: 'auth0-login-container',
  redirectUrl: serverUrl,
  apiUrl: 'https://portal.truecoders.io:3000'
};

export default appConfig;
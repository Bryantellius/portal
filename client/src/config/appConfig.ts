const serverUrl = "http://localhost:3000";

const appConfig: any = {
    serverUrl: serverUrl,
    apiRoot: `${ serverUrl }/api`,
    apiTimeout: 10000,
    auth0Domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
    auth0ClientId: process.env.REACT_APP_AUTH0_CLIENT_ID || ''
};

export default appConfig;
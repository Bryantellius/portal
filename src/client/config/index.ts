const serverUrl = "http://localhost:3000";

const clientConfig = {
    serverUrl: serverUrl,
    apiRoot: `${ serverUrl }/api`,
    apiTimeout: 10000
}

export default clientConfig;
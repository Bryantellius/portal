import jwt from 'express-jwt';
import jwtAuthz from 'express-jwt-authz';
import jwksRsa from 'jwks-rsa';

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: false,
    jwksUri: process.env.AUTH0_JWKS_URL
  }),

  audience: process.env.API_URL,
  issuer: [process.env.AUTH0_URL],
  algorithms: ['RS256']
});

export default checkJwt;
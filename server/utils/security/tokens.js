import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import models from '../../db/models';
import config from '../../config';

export const CreateToken = async ( payload ) => {
  payload.unique = crypto.randomBytes(32).toString('hex');
  const token = jwt.sign(payload, config.secret_key);
  await models.AccessToken.create({
    userId: payload.userid,
    token: token
  });

  return token;
};

export const ValidToken = async ( token ) => {
  const payload = jwt.decode(token);
  const validatedToken = await models.AccessToken.findOne({
    where: {
      id: payload.accesstokenid
    }
  });

  if (!validatedToken) {
    throw new Error('Invalid Token');
  } else {
    return validatedToken;
  }
};

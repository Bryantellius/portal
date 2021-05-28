import crypto from "crypto";
import jwt from "jsonwebtoken";
import models from "../../db/models";
import config from "../../config";
import { IPayload } from "../types";

export const CreateToken = async (payload: IPayload) => {
  payload.unique = crypto.randomBytes(32).toString("hex");
  let token = jwt.sign(payload, config.secret_key);
  await models.AccessToken.create({
    userId: payload.userid,
    token: token
  });

  return token;
};

export const ValidToken = async (token: any, userId: number) => {
  const payload: IPayload = <IPayload>jwt.decode(token);
  const validatedToken: any = await models.AccessToken.findOne({
    where: {
      id: payload.accesstokenid,
      userId: userId
    }
  });

  if (!validatedToken) {
    throw new Error("Invalid Token");
  } else {
    return payload;
  }
};

import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import db from "../../db/queries/tokens";
import config from "../../config";
import { IPayload } from "../types";

export const CreateToken = async (payload: IPayload) => {
  let data: any = await db.addToken(payload.userid);
  payload.accesstokenid = data.insertId;
  payload.unique = crypto.randomBytes(32).toString("hex");
  let token = await jwt.sign(payload, config.secret_key);
  data = await db.updateToken(payload.accesstokenid, token);
  return token;
};

export const ValidToken = async (token: string) => {
  let payload: IPayload = <IPayload>jwt.decode(token);
  let accesstokenid: any = await db.findToken(payload.accesstokenid, token);
  if (!accesstokenid[0]) {
    throw new Error("Invalid Token");
  } else {
    return payload;
  }
};

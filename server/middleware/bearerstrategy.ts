import passport from "passport";
import BearerStrategy from "passport-http-bearer";
import { ValidToken } from "../utils/security/tokens";
import db from "../db/models";
import { IPayload } from "../utils/types";

passport.use(
  new BearerStrategy.Strategy(async (token, next) => {
    try {
      let payload: IPayload = await ValidToken(token);
      let [user]: any = await db.User.findByPk(payload.userid);
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    } catch (error) {
      next(error);
    }
  })
);

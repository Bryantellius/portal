import * as passport from "passport";
import * as LocalStrategy from "passport-local";
import db from "../db/queries/users";
import { comparePassword } from "../utils/security/passwords";

passport.serializeUser((user, next) => next(null, user));
passport.deserializeUser((user, next) => next(null, user));

passport.use(
  new LocalStrategy.Strategy(
    { usernameField: "email", session: false },
    async (email, password, next) => {
      try {
        let user: any = await db.findOneUserByEmail(email);
        if (user[0] && comparePassword(password, user[0].password)) {
          next(null, user[0]);
        } else {
          next(null, false);
        }
      } catch (error) {
        next(error);
      }
    }
  )
);

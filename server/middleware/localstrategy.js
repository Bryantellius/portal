import passport from "passport";
import LocalStrategy from "passport-local";
import models from "../db/models";
import { comparePassword } from "../utils/security/passwords";

passport.serializeUser((user, next) => next(null, user));
passport.deserializeUser((user, next) => next(null, user));

passport.use(
  new LocalStrategy.Strategy(
    { usernameField: "email", session: false },
    async (email, password, next) => {
      try {
        let user = await models.User.findOne({
          where: {
            email: email
          },
          include: [models.Role]
        });
        if (user && (await comparePassword(password, user.password))) {
          next(null, user);
        } else {
          next(null, false);
        }
      } catch (error) {
        next(error);
      }
    }
  )
);
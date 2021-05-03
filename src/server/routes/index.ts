import * as express from "express";
import * as passport from "passport";
import apiRouter from "./api";
import authRouter from "./auth";

const router = express.Router();

router.use((req, res, next) => {
  passport.authenticate("bearer", { session: false }, (err, user, info) => {
    if (user) req.user = user;
    return next();
  })(req, res, next);
});

router.use("/api", apiRouter);
router.use("/auth", authRouter);

export default router;

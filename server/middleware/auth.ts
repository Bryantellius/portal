import passport from "passport";
import { Request, Response, NextFunction } from "express";

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("bearer", { session: false }, (err, user, info) => {
        if (user) {
            req.user = user;
        }
        
        return next();
    })(req, res, next);
}

export default authenticateUser;
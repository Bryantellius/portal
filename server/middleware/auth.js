import passport from 'passport';

const authenticateUser = ( req, res, next ) => {
  passport.authenticate('bearer', { session: false }, ( err, user, info ) => {
    if (user) {
      req.user = user;
    }

    return next();
  })(req, res, next);
};

export default authenticateUser;
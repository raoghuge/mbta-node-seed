const passport = require('passport');

exports.authorizeUser = function (req, res, next) {
  passport.authenticate('jwt', function (error, user) {
    if (error) return res.unauthorized(error);
    if (!user)
      return res.unauthorized('No User Found');
    next();
  })(req, res);
};

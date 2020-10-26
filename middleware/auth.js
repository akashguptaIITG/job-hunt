const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const UserModel = require("../model/user");

const options = {};
options.jwtFromRequest = function extractTokenFromCookie(req) {
  return req.cookies.token;
};
options.secretOrKey = process.env.JWT_SECRET;

module.exports.authenticationStartegy = function () {
  return new JwtStrategy(options, async function (jwtPayload, done) {
    try {
      const user = await UserModel.findOne({ _id: jwtPayload._id });
      if (!user) {
        done(null, false);
      }
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err, false);
    }
  });
};

// authentication using passport
module.exports.isAuthenticated = function () {
  // return (re, rs, n) => n();

  return passport.authenticate("jwt", {
    session: false,
  });
};

// role based authorization
module.exports.isAuthorized = function (roles = []) {
  // return (re, rs, n) => n();

  return function (req, res, next) {
    if (roles.length && !roles.includes(req.user.role)) {
      // user's role is not authorized
      return res.status(401).json({ message: "Unauthorized" });
    }
    // authentication and authorization successful
    next();
  };
};

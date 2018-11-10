const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../db/models/User');
const secretOrKey = require('../utils/keys').secretOrKey;

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(
    opts, 
    async(payload, done) => {
      try {
        // Find the user specified in the token. If the user doesn't exist, handle it, otherwise return the user
        const user = await User.findUser(payload);
        if(user === false) {
          return done(null, false);
        } else {
          done(null, user);
        }
      } catch(err) {
        done(error, false);
      }
  }));
}
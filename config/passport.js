const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const sql = require('../db/db');
const config = require('../config/config');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwt.secret;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    sql.query({
      sql: 'SELECT * FROM `user` WHERE `id` = ?',
    }, 
    [jwt_payload.id],
    (err, result) => {
      if(result[0]) {
        const user = {
          id: result[0].id,
          firstName: result[0].first_name,
          lastName: result[0].last_name,
          email: result[0].email
        };
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }))
};

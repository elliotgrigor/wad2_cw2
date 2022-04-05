const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;

const staff = require('../models/StaffModel');

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET,
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  staff.db.findOne(
    { staffId: jwt_payload.id },
    (err, user) => {
      if (err) return done(err, false);
      if (user) return done(null, user);
      return done(null, false);
    });
  })
);

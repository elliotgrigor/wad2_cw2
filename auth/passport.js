const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;

const Staff = require('../models/StaffModel');

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

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await Staff.findOne({ staffId: jwt_payload.id });

    if (user) return done(null, user);
    return done(null, false);
  }
  catch (err) {
    return done(err, false);
  }
}));

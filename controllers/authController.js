const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const StaffModel = require('../models/StaffModel');
const staff = new StaffModel(); // *** USING IN-MEMORY DB ***

passport.use(new LocalStrategy((username, password, done) => {
  staff.db.findOne(
    { staffId: username },
    (err, doc) => {
      if (err) return done(err);
      if (!doc) return done(null, false, { message: 'Incorrect username or password.' });

      bcrypt.compare(password, doc.password, (err, result) => {
        if (err) return done(err);
        if (!result) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
        return done(null, doc);
      });
    }
  );
}));

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, { ...user });
  });
});

passport.deserializeUser((user, done) => {
  process.nextTick(() => {
    return done(null, user);
  });
});

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return console.log(err);
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
};

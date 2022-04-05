const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const staff = require('../models/StaffModel');

exports.login = (req, res) => {
  staff.db.findOne(
    { staffId: req.body.id },
    { 'staffId': 1, 'password': 1 },
    (err, user) => {
      if (err) return console.log(err);
      if (!user) return console.log("Couldn't find user");
      
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) return console.log(err);
        if (!result) return console.log("Passwords don't match!");

        const token = jwt.sign({ id: user.staffId }, process.env.SECRET, {
          expiresIn: '1800s', // 30 minutes
        });
        res.cookie('jwt', token).redirect('/staff');
      });
    }
  );
};

exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
};

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Staff = require('../models/StaffModel');

exports.login = (req, res) => {
  Staff.findOne({ staffId: req.body.id }, { 'staffId': 1, 'password': 1 })
    .then(user => {
      if (!user) return console.log("Couldn't find user");

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) return console.log(err);
        if (!result) return console.log("Passwords don't match!");

        const token = jwt.sign({ id: user.staffId }, process.env.SECRET, {
          expiresIn: '1800s', // 30 minutes
        });
        res.cookie('jwt', token).redirect('/staff');
      });
    })
    .catch(err => console.log(err));
};

exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
};

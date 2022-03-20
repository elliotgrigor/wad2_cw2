const express = require('express');
const router = express.Router();
const passport = require('passport');

require('../controllers/authController');

router.post('/login', passport.authenticate('local', {
  successRedirect: '/staff',
  failureRedirect: '/login',
}));

module.exports = router;

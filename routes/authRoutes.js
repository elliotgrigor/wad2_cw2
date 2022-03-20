const express = require('express');
const router = express.Router();
const passport = require('passport');

const auth = require('../controllers/authController');

router.post('/login', passport.authenticate('local', {
  successRedirect: '/staff',
  failureRedirect: '/login',
}));
router.get('/logout', auth.logout);

module.exports = router;

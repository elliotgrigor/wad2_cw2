const express = require('express');
const router = express.Router();

const staff = require('../controllers/staffController');

const passportAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

router.get('', (req, res) => res.redirect('staff/dashboard'));
router.get('/dashboard', passportAuth, staff.dashboard);

module.exports = router;

const express = require('express');
const router = express.Router();

const staff = require('../controllers/staffController');

router.get('/dashboard', staff.dashboard);
router.get('*', (_, res) => res.redirect('/staff/dashboard'));

module.exports = router;

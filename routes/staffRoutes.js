const express = require('express');
const router = express.Router();

const staff = require('../controllers/staffController');

router.get('/dashboard', staff.dashboard);
router.get('/dishes', staff.dishes);
router.get('/dishes/add', staff.addDish);
router.post('/dishes/add', staff.addDishPOST);

router.get('*', (_, res) => res.redirect('/staff/dashboard'));

module.exports = router;

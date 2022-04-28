const express = require('express');
const router = express.Router();

const staff = require('../controllers/staffController');

router.get('/dashboard', staff.dashboard);
router.get('/dishes', staff.dishes);
router.get('/dishes/add', staff.addDish);
router.get('/dishes/:id', staff.editDish);
router.get('/register', staff.registerUser);

router.post('/dishes/add', staff.addDishPOST);
router.post('/dishes/:id/update', staff.editDishPOST);
router.post('/dishes/:id/delete', staff.deleteDish);
router.post('/register', staff.registerUserPOST);

router.get('*', (_, res) => res.redirect('/staff/dashboard'));

module.exports = router;

const express = require('express');
const router = express.Router();

const pages = require('../controllers/pageController');

router.get('/', pages.home);
router.get('/menu', pages.menu);
router.get('/contact', pages.contact);
router.get('/aboutus', pages.aboutUs);

router.get('/login', pages.login);

module.exports = router;

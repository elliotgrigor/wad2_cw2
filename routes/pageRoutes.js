const express = require('express');
const router = express.Router();

const pages = require('../controllers/pageController');

router.get('/', pages.home);
router.get('/menu', pages.menu);
router.get('/menu/:slug', pages.viewDish);
router.get('/contact', pages.contact);
router.get('/faqs', pages.faqs);
router.get('/about-us', pages.aboutUs);

router.get('/login', pages.login);

router.post('/contact', pages.contactPOST);

module.exports = router;

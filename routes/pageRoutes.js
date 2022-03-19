const express = require('express');
const router = express.Router();

const pages = require('../controllers/pageController');

router.get('/', pages.home);

module.exports = router;

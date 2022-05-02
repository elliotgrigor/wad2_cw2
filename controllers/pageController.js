const jwt = require('jsonwebtoken');

const Dish = require('../models/DishModel');
const FAQ = require('../models/FAQModel');

exports.home = (req, res) => {
  const css = [
    { url: '/css/home.css' },
  ];

  res.render('home', { pageTitle: 'Home', css });
};

exports.menu = async (req, res) => {
  const css = [
    { url: '/css/menu.css' },
  ];

  const menus = await Dish.getSortedMenu(false); // withHidden: false

  res.render('menu', { pageTitle: 'Menu', css, menus });
};

exports.viewDish = async (req, res) => {
  const dish = await Dish.findOne({ slug: req.params.slug });

  res.render('viewDish', { pageTitle: `Menu - ${dish.name}`, dish });
};

exports.contact = async (req, res) => {
  const css = [
    { url: '/css/contact.css' },
  ];

  const faqs = await FAQ.find({ pinned: true }).limit(3);

  res.render('contact', { pageTitle: 'Contact', css, faqs });
};

exports.aboutUs = (req, res) => {
  res.render('about', { pageTitle: 'About us' });
};

exports.login = async (req, res) => {
  const accessToken = req.cookies['jwt'];
  const css = [
    { url: '/css/login.css' },
  ];

  if (!accessToken) {
    return res.render('login', { pageTitle: 'Login', css });
  }

  try {
    await jwt.verify(accessToken, process.env.SECRET);
    return res.redirect('/staff/dashboard');
  }
  catch (err) {
    return res.render('login', { pageTitle: 'Login', css });
  }
};

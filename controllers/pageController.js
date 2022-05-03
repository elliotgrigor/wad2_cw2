const jwt = require('jsonwebtoken');

const Dish = require('../models/DishModel');
const Message = require('../models/MessageModel');
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
  const dish = await Dish.getBySlug(req.params.slug);

  res.render('viewDish', { pageTitle: `Menu - ${dish.name}`, dish });
};

exports.contact = async (req, res) => {
  const css = [
    { url: '/css/contact.css' },
  ];

  const pinnedFAQs = await FAQ.getPinnedFAQs();

  res.render('contact', { pageTitle: 'Contact', css, pinnedFAQs });
};

exports.faqs = async (req, res) => {
  const css = [
    { url: '/css/faqs.css' },
  ];

  const faqs = await FAQ.getAll(true); // sortByPinned: true

  res.render('faqs', { pageTitle: 'FAQs', css, faqs });
};

exports.aboutUs = (req, res) => {
  const css = [
    { url: '/css/about.css' },
  ];

  res.render('about', { pageTitle: 'About us', css });
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

exports.contactPOST = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!email || !message) {
    return res.redirect('/contact');
  }

  const newMessage = {
    name,
    email,
    subject,
    body: message,
    sentAt: new Date().toISOString(),
    unread: true,
  };

  try {
    const doc = await Message.insert(newMessage);
    console.log('Inserted:', doc);

    return res.redirect('/contact');
  }
  catch (err) {
    console.log(err);
  }
};

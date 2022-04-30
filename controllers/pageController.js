const jwt = require('jsonwebtoken');

exports.home = (req, res) => {
  const css = [
    { url: '/css/home.css' },
  ];

  res.render('home', { pageTitle: 'Home', css });
};

exports.menu = (req, res) => {
  res.render('menu', { pageTitle: 'Menu' });
};

exports.contact = (req, res) => {
  res.render('contact', { pageTitle: 'Contact' });
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

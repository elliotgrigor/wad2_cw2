const jwt = require('jsonwebtoken');

exports.home = (req, res) => {
  res.render('home', {});
};

exports.menu = (req, res) => {
  res.render('menu', {});
};

exports.contact = (req, res) => {
  res.render('contact', {});
};

exports.aboutUs = (req, res) => {
  res.render('about', {});
};

exports.login = (req, res) => {
  const accessToken = req.cookies['jwt'];
  const css = [
    { url: '/css/login.css' },
  ];

  if (!accessToken) {
    return res.render('login', { css });
  }

  jwt.verify(accessToken, process.env.SECRET, (err, _) => {
    if (err) {
      return res.render('login', { css });
    }
    return res.redirect('/staff/dashboard');
  });
};

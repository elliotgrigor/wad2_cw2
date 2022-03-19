const { render } = require('mustache-express');

exports.home = (req, res) => {
  res.render('home', {});
};

exports.login = (req, res) => {
  const css = [
    { url: '/css/login.css' },
  ];

  res.render('login', { css });
};

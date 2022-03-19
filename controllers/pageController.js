const { render } = require('mustache-express');

exports.home = (req, res) => {
  res.render('home', {});
};

exports.login = (req, res) => {
  res.render('login', {});
};

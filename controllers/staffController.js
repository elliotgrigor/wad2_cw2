const { render } = require('mustache-express');

exports.dashboard = (req, res) => {
  res.render('staff/dashboard', {});
};

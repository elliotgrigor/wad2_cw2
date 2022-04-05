
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
  const css = [
    { url: '/css/login.css' },
  ];

  res.render('login', { css });
};

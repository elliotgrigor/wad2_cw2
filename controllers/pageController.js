
exports.home = (req, res) => {
  res.render('home', {});
};

exports.login = (req, res) => {
  // no need to access login if already auth'd
  if (req.isAuthenticated()) {
    return res.redirect('/staff');
  }

  const css = [
    { url: '/css/login.css' },
  ];

  res.render('login', { css });
};


exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return console.log(err);
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
};

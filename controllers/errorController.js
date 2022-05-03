
exports.notFound = (req, res) => {
  const css = [
    { url: '/css/error/404.css' },
  ];

  res.render('err/notFound', { pageTitle: 'Not Found', css });
};

const Datastore = require('@seald-io/nedb');

exports.menu = new Datastore({
  filename: process.env.MENU_DB,
  autoload: true,
});

exports.staff = new Datastore({
  filename: process.env.STAFF_DB,
  autoload: true,
});

exports.messages = new Datastore({
  filename: process.env.MSG_DB,
  autoload: true,
});

exports.faqs = new Datastore({
  filename: process.env.FAQ_DB,
  autoload: true,
});

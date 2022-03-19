const Datastore = require('@seald-io/nedb');

const menu = new Datastore({
  filename: '../db/menu.collection',
  autoload: true,
});

const staff = new Datastore({
  filename: '../db/staff.collection',
  autoload: true,
});

const messages = new Datastore({
  filename: '../db/messages.collection',
  autoload: true,
});

const faqs = new Datastore({
  filename: '../db/faqs.collection',
  autoload: true,
});

exports.menu     = menu;
exports.staff    = staff;
exports.messages = messages;
exports.faqs     = faqs;

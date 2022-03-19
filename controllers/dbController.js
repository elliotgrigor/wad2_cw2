const Datastore = require('@seald-io/nedb');

exports.menu = new Datastore({
  filename: '../db/menu.collection',
  autoload: true,
});

exports.staff = new Datastore({
  filename: '../db/staff.collection',
  autoload: true,
});

exports.messages = new Datastore({
  filename: '../db/messages.collection',
  autoload: true,
});

exports.faqs = new Datastore({
  filename: '../db/faqs.collection',
  autoload: true,
});

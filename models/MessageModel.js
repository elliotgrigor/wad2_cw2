const { Model } = require('nedb-models');

class Message extends Model {
  static datastore() {
    return {
      filename: process.env.MSG_DB,
    }
  }
}

module.exports = Message;

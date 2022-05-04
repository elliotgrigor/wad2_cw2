const { Model } = require('nedb-models');

class Message extends Model {
  static datastore() {
    return {
      filename: process.env.MSG_DB,
    }
  }

  static async getAll() {
    try {
      return await this.find({}).sort({ sentAt: -1 });
    }
    catch (err) {
      console.log(err);
    }
  }
}

module.exports = Message;

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

  static async getById(id) {
    try {
      return await this.findOne({ _id: id });
    }
    catch (err) {
      console.log(err);
    }
  }

  static async markAsRead(id) {
    try {
      await this.update(
        { _id: id },
        { $set: {
          unread: false,
        } },
        { /* options */ },
      );

      console.log('Marked message', id, 'as read');
    }
    catch (err) {
      console.log(err);
    }
  }
}

module.exports = Message;

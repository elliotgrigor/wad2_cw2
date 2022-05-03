const { Model } = require('nedb-models');

class FAQ extends Model {
  static datastore() {
    return {
      filename: process.env.FAQ_DB,
    }
  }

  static async getPinnedFAQs() {
    try {
      return await this.find({ pinned: true }).limit(3);
    }
    catch (err) {
      console.log(err);
    }
  }

  static async getAll(sortByPinned) {
    try {
      if (sortByPinned) {
        return await this.find({}).sort({ pinned: -1 });
      }
      return await this.find({});
    }
    catch (err) {
      console.log(err);
    }
  }

  static async getById(id) {
    try {
      return await this.find({ _id: id });
    }
    catch (err) {
      console.log(err);
    }
  }

  static async seed(faq) {
    try {
      const doc = await this.insert(faq);
      console.log('Inserted:', doc);
    }
    catch (err) {
      console.log(err);
    }
  }
}

module.exports = FAQ;

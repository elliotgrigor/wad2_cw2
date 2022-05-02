const { Model } = require('nedb-models');

class FAQ extends Model {
  static datastore() {
    return {
      filename: process.env.FAQ_DB,
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

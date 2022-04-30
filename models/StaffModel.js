const { Model } = require('nedb-models');
const bcrypt = require('bcrypt');

class Staff extends Model {
  static datastore() {
    return {
      filename: process.env.STAFF_DB,
    }
  }

  static async seed(user, password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const doc = await this.insert({ ...user, password: hash });
      console.log('Inserted:', doc);
    }
    catch (err) {
      console.log(err);
    }
  }
}

module.exports = Staff;

const { Model } = require('nedb-models');
const bcrypt = require('bcrypt');

class Staff extends Model {
  static datastore() {
    return {
      filename: process.env.STAFF_DB,
    }
  }

  static getStaffMember(staffId) {
    return new Promise((resolve, reject) => {
      this.findOne({ staffId })
        .then(user => {
          resolve(user);
        })
        .catch(err => reject(err));
    });
  }

  static seed(user, password) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        this.insert({ ...user, password: hash })
          .then(doc => console.log('Inserted:', doc))
          .catch(err => console.log(err));
      });
    });
  }
}

module.exports = Staff;

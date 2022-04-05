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

  static seed() {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash('verysecurepassword', salt, (err, hash) => {
        this.insert({
          staffId: 'A001',
          firstName: 'John',
          lastName: 'Smith',
          password: hash,
          email: 'john@restaurant.co.uk',
        });
      });
    });
  }
}

module.exports = Staff;

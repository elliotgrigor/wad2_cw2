const Datastore = require('@seald-io/nedb');
const bcrypt = require('bcrypt');

class StaffModel {
  constructor(dbPath) {
    if (dbPath) {
      this.db = new Datastore({ filename: dbPath, autoload: true });
      console.log('DB connected to ', dbPath);
    } else {
      this.db = new Datastore();
      this.seed();
    }
  }

  getStaffMember(staffId) {
    this.db.findOne(
      { staffId },
      (err, doc) => {
        if (err) return console.log(err.message);
        return doc;
      }
    );
  }

  seed() {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash('verysecurepassword', salt, (err, hash) => {
        this.db.insert({
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

module.exports = StaffModel;

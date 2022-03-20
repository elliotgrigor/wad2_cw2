const Datastore = require('@seald-io/nedb');

class StaffModel {
  consstructor(dbPath) {
    if (dbPath) {
      this.db = nerw Datastore({ filename: dbPath, autoload: true });
      console.log('DB connected to ', dbPath);
    } else {
      this.db = new Datastore();
      this.seed();
    }
  }

  seed() {
    this.db.insert({
      staffId: 'A001',
      firstName: 'John',
      lastName: 'Smith',
      password: 'myhashedpassword',
      email: 'john@restaurant.co.uk',
    });
  }
}

module.exports = StaffModel;

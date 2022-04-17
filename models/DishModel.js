const { Model } = require('nedb-models');

class Dish extends Model {
  static datastore() {
    return {
      filename: process.env.MENU_DB,
    }
  }

  static seed(dish) {
    this.insert(dish)
      .then(doc => console.log('Inserted:', doc))
      .catch(err => console.log(err));
  }
}

module.exports = Dish;

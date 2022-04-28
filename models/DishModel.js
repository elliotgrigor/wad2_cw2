const { Model } = require('nedb-models');

class Dish extends Model {
  static datastore() {
    return {
      filename: process.env.MENU_DB,
    }
  }

  static async getSortedMenu() {
    const menus = {
      allday: { specials: [], dishes: [] },
      lunch: { specials: [], dishes: [] },
      dinner: { specials: [], dishes: [] },
    };

    try {
      const dishes = await this.find({});

      dishes.forEach(dish => {
        // sort dish types into their own arrays
        if (dish.dishType === 'allday') {
          if (dish.chefSpecial) {
            return menus.allday.specials.push(dish);
          }
          menus.allday.dishes.push(dish);
        }
        else if (dish.dishType === 'lunch') {
          if (dish.chefSpecial) {
            return menus.lunch.specials.push(dish);
          }
          menus.lunch.dishes.push(dish);
        }
        else if (dish.dishType === 'dinner') {
          if (dish.chefSpecial) {
            return menus.dinner.specials.push(dish);
          }
          menus.dinner.dishes.push(dish);
        }
      });

      return menus;
    }
    catch (err) {
      console.log(err);
    }
  }

  static seed(dish) {
    this.insert(dish)
      .then(doc => console.log('Inserted:', doc))
      .catch(err => console.log(err));
  }
}

module.exports = Dish;

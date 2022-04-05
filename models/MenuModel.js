const { Model } = require('nedb-models');

class Menu extends Model {
  static datastore() {
    return {
      filename: process.env.MENU_DB,
    }
  }

  static seed() {
    this.insert({
      name: 'Test Dish',
      description: 'This is a test description',
      content: {
        ingredients: ['ingredient1', 'ingredient2', 'ingredient3'],
        allergyInfo: {
          allergens: ['allergen1', 'allergen2'],
          advice: 'This is some allergy advice',
        },
      },
      chefSpecial: true,
      dishType: 'allday',
      price: 8.45,
    });
  }
}

module.exports = Menu;

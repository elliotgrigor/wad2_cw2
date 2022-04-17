require('dotenv').config();

const Dish = require('./models/DishModel');

const data = [
  {
    name: 'AllDay Special',
    description: 'This is a test description',
    content: {
      ingredients: ['ingredient1', 'ingredient2', 'ingredient3'],
      allergyInfo: {
        allergens: ['allergen1', 'allergen2'],
        advice: 'This is some allergy advice',
      },
    },
    chefSpecial: true,
    vegetarian: false,
    vegan: false,
    dishType: 'allday',
    price: 8.45,
  },
  {
    name: 'AllDay Regular',
    description: 'This is a test description',
    content: {
      ingredients: ['ingredient1', 'ingredient2', 'ingredient3'],
      allergyInfo: {
        allergens: ['allergen1', 'allergen2'],
        advice: 'This is some allergy advice',
      },
    },
    chefSpecial: false,
    vegetarian: false,
    vegan: false,
    dishType: 'allday',
    price: 8.45,
  },
  {
    name: 'Lunch Special',
    description: 'This is a test description',
    content: {
      ingredients: ['ingredient1', 'ingredient2', 'ingredient3'],
      allergyInfo: {
        allergens: ['allergen1', 'allergen2'],
        advice: 'This is some allergy advice',
      },
    },
    chefSpecial: true,
    vegetarian: false,
    vegan: false,
    dishType: 'lunch',
    price: 8.45,
  },
  {
    name: 'Lunch Regular',
    description: 'This is a test description',
    content: {
      ingredients: ['ingredient1', 'ingredient2', 'ingredient3'],
      allergyInfo: {
        allergens: ['allergen1', 'allergen2'],
        advice: 'This is some allergy advice',
      },
    },
    chefSpecial: false,
    vegetarian: false,
    vegan: false,
    dishType: 'lunch',
    price: 8.45,
  },
  {
    name: 'Dinner Special',
    description: 'This is a test description',
    content: {
      ingredients: ['ingredient1', 'ingredient2', 'ingredient3'],
      allergyInfo: {
        allergens: ['allergen1', 'allergen2'],
        advice: 'This is some allergy advice',
      },
    },
    chefSpecial: true,
    vegetarian: false,
    vegan: false,
    dishType: 'dinner',
    price: 8.45,
  },
  {
    name: 'Dinner Regular',
    description: 'This is a test description',
    content: {
      ingredients: ['ingredient1', 'ingredient2', 'ingredient3'],
      allergyInfo: {
        allergens: ['allergen1', 'allergen2'],
        advice: 'This is some allergy advice',
      },
    },
    chefSpecial: false,
    vegetarian: false,
    vegan: false,
    dishType: 'dinner',
    price: 8.45,
  },
];

data.forEach(doc => {
  Dish.seed(doc);
});

require('dotenv').config();

const Dish = require('./models/DishModel');
const Staff = require('./models/StaffModel');

const dishData = [
  {
    name: 'Crab & Saffron Risotto',
    description: 'A seasoned crab risotto garnished with finely chopped dill',
    content: {
      ingredients: ['Crab', 'Rice', 'Butter', 'Garlic', 'Cheese', 'Onion', 'Wine'],
      allergyInfo: {
        allergens: ['Butter', 'Cheese', 'Wine'],
        advice: 'Contains: dairy produce, alcohol',
      },
    },
    chefSpecial: true,
    vegetarian: false,
    vegan: false,
    dishType: 'allday',
    price: 8.35,
  },
  {
    name: 'Prawn Tikka Masala',
    description: 'A low calorie prawn tikka masala served with naan bread.',
    content: {
      ingredients: ['Prawns', 'Rice', 'Tomato', 'Almonds', 'Cream', 'Garlic', 'Onion'],
      allergyInfo: {
        allergens: ['Almonds', 'Cream'],
        advice: 'Contains: dairy produce, nuts',
      },
    },
    chefSpecial: false,
    vegetarian: false,
    vegan: false,
    dishType: 'allday',
    price: 7.40,
  },
  {
    name: 'Seafood Spaghetti',
    description: 'A bowl of mixed seafood pasta bursting with nutrients.',
    content: {
      ingredients: ['Prawns', 'Mussels', 'Squid', 'Tomato', 'Garlic', 'Spaghetti', 'Onion'],
      allergyInfo: {
        allergens: [],
        advice: 'n/a',
      },
    },
    chefSpecial: true,
    vegetarian: false,
    vegan: false,
    dishType: 'lunch',
    price: 7.70,
  },
  {
    name: 'Mixed Fish Chowder',
    description: 'A creamy soup with salmon, smoked haddock, mixed shellfish and potatoes.',
    content: {
      ingredients: ['Salmon', 'Haddock', 'Prawns', 'Crab', 'Oyster', 'Potato', 'Cream'],
      allergyInfo: {
        allergens: ['Cream'],
        advice: 'Contains: dairy produce',
      },
    },
    chefSpecial: false,
    vegetarian: false,
    vegan: false,
    dishType: 'lunch',
    price: 6.95,
  },
  {
    name: 'Paella Mixta',
    description: 'A combination of meat and seafood with king prawns, mussels, chorizo and chicken.',
    content: {
      ingredients: ['Prawns', 'Mussels', 'Chicken', 'Rice', 'Peas', 'Chorizo'],
      allergyInfo: {
        allergens: [],
        advice: 'n/a',
      },
    },
    chefSpecial: true,
    vegetarian: false,
    vegan: false,
    dishType: 'dinner',
    price: 9.15,
  },
  {
    name: 'Crab & Asparagus Pappardelle',
    description: 'Ribbons of pasta mixed with seasoned white & brown crab meat.',
    content: {
      ingredients: ['Crab', 'Asparagus', 'Hazelnuts', 'Tomato', 'Parsley', 'Lemon'],
      allergyInfo: {
        allergens: ['Hazelnuts'],
        advice: 'Contains: nuts',
      },
    },
    chefSpecial: false,
    vegetarian: false,
    vegan: false,
    dishType: 'dinner',
    price: 7.75,
  },
];

const staffData = [
  {
    staffId: 'A001',
    firstName: 'John',
    lastName: 'Smith',
    password: 'admin',
    email: 'j.smith@pinguseafood.co.uk',
  },
];

dishData.forEach(doc => {
  Dish.seed(doc);
});

staffData.forEach(doc => {
  Staff.seed(doc, doc.password);
});

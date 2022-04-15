const Dish = require('../models/DishModel');

exports.dashboard = (req, res) => {
  res.render('staff/dashboard', {});
};

exports.dishes = (req, res) => {
  res.render('staff/menus', {});
};

exports.addDish = (req, res) => {
  const css = [
    { url: '/css/staff/addDish.css' },
  ];

  res.render('staff/addDish', { css });
};

exports.addDishPOST = (req, res) => {
  let {
    name, desc, dish_type, price, is_special,
    ingredients, allergens, allergy_advice,
    is_vegetarian, is_vegan,
  } = req.body;

  const ingredientList = ingredients.replace(/\s/g, '').split(',');
  const allergenList = allergens.replace(/\s/g, '').split(',');

  // link vegan suitable to vegetarian
  if (is_vegan === 'on') {
    is_vegetarian = 'on';
  }

  Menu.insert({
    name,
    description: desc,
    content: {
      ingredients: ingredientList,
      allergyInfo: {
        allergens: allergenList,
        advice: allergy_advice,
      },
    },
    chefSpecial: is_special === 'on' ? true : false,
    vegetarian: is_vegetarian === 'on' ? true : false,
    vegan: is_vegan === 'on' ? true : false,
    dishType: dish_type,
    price,
  })
  .then(doc => {
    console.log('Inserted:', doc);
    res.redirect('/staff'); 
  })
  .catch(err => console.log(err));
};

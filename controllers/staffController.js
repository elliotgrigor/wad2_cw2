const Dish = require('../models/DishModel');

exports.dashboard = (req, res) => {
  res.render('staff/dashboard', {});
};

exports.dishes = (req, res) => {
  const css = [
    { url: '/css/staff/menus.css' },
  ];

  const js = [
    { url: '/js/setHeightScrollContainer.js' },
  ];

  Dish.find({})
    .then(dishes => {
      const menus = {
        allday: { specials: [], dishes: [] },
        lunch: { specials: [], dishes: [] },
        dinner: { specials: [], dishes: [] },
      };

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

      res.render('staff/menus', { css, js, menus });
    })
    .catch(err => console.log(err));
};

exports.addDish = (req, res) => {
  const css = [
    { url: '/css/staff/dishForm.css' },
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

  Dish.insert({
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
    res.redirect('/staff/dishes');
  })
  .catch(err => console.log(err));
};

exports.editDish = (req, res) => {
  const css = [
    { url: '/css/staff/dishForm.css' },
  ];

  Dish.findOne({ _id: req.params.id })
    .then(dish => {
      typeOptions = [
        { value: 'allday', text: 'All Day' },
        { value: 'lunch', text: 'Lunch' },
        { value: 'dinner', text: 'Dinner' },
      ];

      typeOptions.forEach(option => {
        if (dish.dishType === option.value) {
          option.selected = true;
        }
      });

      dish.content.ingredients
        = dish.content.ingredients.join(', ');
      dish.content.allergyInfo.allergens
        = dish.content.allergyInfo.allergens.join(', ');

      res.render('staff/editDish', { css, dish, typeOptions });
    })
    .catch(err => console.log(err));
};

exports.editDishPOST = (req, res) => {
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

  Dish.update(
    { _id: req.params.id },
    { $set: {
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
    } },
    {}, // options
  )
  .then(doc => {
    console.log('Updated:', doc);
    res.redirect('/staff/dishes');
  })
  .catch(err => console.log(err));
};

const bcrypt = require('bcrypt');

const Dish = require('../models/DishModel');
const Staff = require('../models/StaffModel');

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
    { url: '/css/staff/form.css' },
  ];

  res.render('staff/addDish', { css });
};

exports.editDish = (req, res) => {
  const css = [
    { url: '/css/staff/form.css' },
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

exports.deleteDish = (req, res) => {
  Dish.remove({ _id: req.params.id }, { /* options */ })
    .then(numRemoved => {
      console.log('Removed:', numRemoved);
      res.redirect('/staff/dishes');
    })
    .catch(err => console.log(err));
};

exports.registerUser = (req, res) => {
  const css = [
    { url: '/css/staff/form.css' },
    { url: '/css/staff/registerForm.css' },
  ];

  res.render('staff/register', { css });
};

exports.addDishPOST = async (req, res) => {
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

  const doc = {
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
  };

  try {
    await Dish.insert(doc);

    console.log('Inserted:', doc);
    res.redirect('/staff/dishes');
  }
  catch (err) {
    console.log(err);
  }
};

exports.editDishPOST = async (req, res) => {
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

  try {
    await Dish.update(
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
    );

    console.log('Updated dish with ID:', req.params.id);
    res.redirect('/staff/dishes');
  }
  catch (err) {
    console.log(err);
  }
};

exports.registerUserPOST = (req, res) => {
  const { id, password, passwordConfirm } = req.body;

  if (password !== passwordConfirm) {
    return res.redirect('/staff/register');
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const doc = {
        staffId: id,
        firstName: 'Test',
        lastName: 'User',
        password: hash,
        email: 't.user@restaurant.co.uk',
      };

      try {
        await Staff.insert(doc);

        console.log('Inserted:', doc);
        res.redirect('/staff/dashboard');
      }
      catch (err) {
        console.log(err);
      }
    });
  });
};

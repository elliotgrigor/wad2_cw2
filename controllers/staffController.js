const bcrypt = require('bcrypt');

const Dish = require('../models/DishModel');
const Staff = require('../models/StaffModel');

exports.dashboard = (req, res) => {
  res.render('staff/dashboard', {});
};

exports.dishes = async (req, res) => {
  const css = [
    { url: '/css/staff/menus.css' },
  ];

  const js = [
    { url: '/js/setHeightScrollContainer.js' },
  ];

  const menus = await Dish.getSortedMenu();

  res.render('staff/menus', { css, js, menus });
};

exports.addDish = (req, res) => {
  const css = [
    { url: '/css/staff/form.css' },
  ];

  res.render('staff/addDish', { css });
};

exports.editDish = async (req, res) => {
  const css = [
    { url: '/css/staff/form.css' },
    { url: '/css/staff/dishForm.css' },
  ];

  const typeOptions = [
    { value: 'allday', text: 'All Day' },
    { value: 'lunch', text: 'Lunch' },
    { value: 'dinner', text: 'Dinner' },
  ];

  try {
    const dish = await Dish.findOne({ _id: req.params.id });

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
  }
  catch (err) {
    console.log(err);
  }
};

exports.deleteDish = async (req, res) => {
  try {
    await Dish.remove({ _id: req.params.id }, { /* options */ });

    console.log('Removed dish with ID:', req.params.id);
    res.redirect('/staff/dishes');
  }
  catch (err) {
    console.log(err);
  }
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

exports.registerUserPOST = async (req, res) => {
  const { id, password, passwordConfirm } = req.body;

  if (!id || !password || !passwordConfirm) {
    return res.redirect('/staff/register');
  }

  if (password !== passwordConfirm) {
    return res.redirect('/staff/register');
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = {
      staffId: id,
      firstName: 'Test',
      lastName: 'User',
      password: hash,
      email: 't.user@pinguseafood.co.uk',
    };

    const doc = await Staff.insert(newUser);

    console.log('Inserted:', doc);
    res.redirect('/staff/dashboard');
  }
  catch (err) {
    console.log(err);
  }
};

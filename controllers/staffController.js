const bcrypt = require('bcrypt');

const Dish = require('../models/DishModel');
const Staff = require('../models/StaffModel');
const FAQ = require('../models/FAQModel');

exports.dashboard = (req, res) => {
  res.render('staff/dashboard', { pageTitle: 'Dashboard' });
};

exports.dishes = async (req, res) => {
  const css = [
    { url: '/css/staff/menus.css' },
  ];

  const js = [
    { url: '/js/setHeightScrollContainer.js' },
  ];

  const menus = await Dish.getSortedMenu(true); // withHidden: true

  res.render('staff/menus', { pageTitle: 'Menus', css, js, menus });
};

exports.addDish = (req, res) => {
  const css = [
    { url: '/css/staff/form.css' },
  ];

  res.render('staff/addDish', { pageTitle: 'Add Dish', css });
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

    res.render('staff/editDish', { pageTitle: 'Edit Dish', css, dish, typeOptions });
  }
  catch (err) {
    console.log(err);
  }
};

exports.faqs = async (req, res) => {
  const css = [
    { url: '/css/staff/faqs.css' },
  ];

  const faqs = await FAQ.getAll(true); // sortByPinned: true

  res.render('staff/faqs', { pageTitle: 'FAQs', css, faqs });
};

exports.addFAQ = (req, res) => {
  const css = [
    { url: '/css/staff/form.css' },
    { url: '/css/staff/faqForm.css' },
  ];

  res.render('staff/addFAQ', { pageTitle: 'Add FAQ', css });
};

exports.editFAQ = async (req, res) => {
  const css = [
    { url: '/css/staff/form.css' },
    { url: '/css/staff/faqForm.css' },
  ];

  const faq = await FAQ.getById(req.params.id);

  res.render('staff/editFAQ', { pageTitle: 'Edit FAQ', css, faq });
};

exports.registerUser = (req, res) => {
  const css = [
    { url: '/css/staff/form.css' },
    { url: '/css/staff/registerForm.css' },
  ];

  res.render('staff/register', { pageTitle: 'Register', css });
};

exports.addDishPOST = async (req, res) => {
  let {
    name, desc, dish_type, price, is_special,
    ingredients, allergens, allergy_advice,
    is_vegetarian, is_vegan, is_hidden,
    slug,
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
    hidden: is_hidden === 'on' ? true : false,
    slug,
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
    is_vegetarian, is_vegan, is_hidden,
    slug,
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
        hidden: is_hidden === 'on' ? true : false,
        slug,
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

exports.addFAQPOST = async (req, res) => {
  const { question, answer, is_pinned } = req.body;

  if (!question || !answer) {
    return res.redirect('/staff/faqs/add');
  }

  const newFAQ = {
    question,
    answer,
    pinned: is_pinned === 'on' ? true : false,
  };

  try {
    const doc = await FAQ.insert(newFAQ);

    console.log('Inserted:', doc);
    res.redirect('/staff/faqs');
  }
  catch (err) {
    console.log(err);
  }
};

exports.editFAQPOST = async (req, res) => {
  const { question, answer, is_pinned } = req.body;

  if (!question || !answer) {
    return res.redirect(`/staff/faqs/${req.params.id}`);
  }

  try {
    await FAQ.update(
      { _id: req.params.id },
      { $set: {
        question,
        answer,
        pinned: is_pinned === 'on' ? true : false,
      } },
      { /* options */ },
    );

    console.log('Updated FAQ with ID:', req.params.id);
    res.redirect('/staff/faqs');
  }
  catch (err) {
    console.log(err);
  }
};

exports.deleteFAQ = async (req, res) => {
  try {
    await FAQ.remove({ _id: req.params.id }, { /* options */ });

    console.log('Removed FAQ with ID:', req.params.id);
    res.redirect('/staff/faqs');
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

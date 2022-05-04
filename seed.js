require('dotenv').config();

const Dish = require('./models/DishModel');
const Staff = require('./models/StaffModel');
const Message = require('./models/MessageModel');
const FAQ = require('./models/FAQModel');

const dishData = [
  {
    name: 'Crab & Saffron Risotto',
    description: 'A seasoned crab risotto garnished with finely chopped dill.',
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
    price: '8.35',
    hidden: false,
    slug: 'crab-saffron-risotto',
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
    price: '7.40',
    hidden: false,
    slug: 'prawn-tikka-masala',
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
    price: '7.70',
    hidden: false,
    slug: 'seafood-spaghetti',
  },
  {
    name: 'Crabless Cakes',
    description: 'Vegan crab cakes made with artichoke hearts, shallots, and celery. Served with tartar sauce.',
    content: {
      ingredients: ['Artichoke', 'Shallots', 'Celery', 'Flour'],
      allergyInfo: {
        allergens: ['Flour'],
        advice: 'Contains: gluten',
      },
    },
    chefSpecial: true,
    vegetarian: true,
    vegan: true,
    dishType: 'lunch',
    price: '5.85',
    hidden: false,
    slug: 'crabless-cakes',
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
    price: '6.95',
    hidden: false,
    slug: 'mixed-fish-chowder',
  },
  {
    name: 'Shrimp Scampi with Pasta',
    description: 'The ultimate seafood pasta dish.',
    content: {
      ingredients: ['Shrimp', 'Pasta', 'Butter', 'Shallots', 'Garlic', 'Wine', 'Parsley'],
      allergyInfo: {
        allergens: ['Butter'],
        advice: 'Contains: dairy produce, alcohol'
      },
    },
    chefSpecial: false,
    vegetarian: false,
    vegan: false,
    dishType: 'lunch',
    price: '6.40',
    hidden: false,
    slug: 'shrimp-scampi-pasta',
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
    price: '9.15',
    hidden: false,
    slug: 'paella-mixta',
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
    price: '7.75',
    hidden: false,
    slug: 'crab-asparagus-pappardelle',
  },
  {
    name: 'Broiled Haddock',
    description: 'A seasoned light and flaky fish served with mixed peas, broccoli, and asparagus',
    content: {
      ingredients: ['Haddock', 'Asparagus', 'Peas', 'Brocolli', 'Butter', 'Garlic'],
      allergyInfo: {
        allergens: ['Butter'],
        advice: 'Contains: dairy produce',
      },
    },
    chefSpecial: false,
    vegetarian: false,
    vegan: false,
    dishType: 'dinner',
    price: '7.10',
    hidden: false,
    slug: 'broiled-haddock',
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

const messageData = [
  {
    name: 'John',
    email: 'john@example.org',
    subject: 'A read message example',
    body: 'The quick brown fox jumps over the lazy dog.',
    sentAt: new Date('March 29, 2022 13:41:12'),
    unread: false,
  },
  {
    name: 'Jane',
    email: 'jane@example.com',
    subject: 'Another read message example',
    body: 'These messages are ordered from newest to oldest.',
    sentAt: new Date('April 13, 2022 10:20:57'),
    unread: false,
  },
  {
    name: 'Jane',
    email: 'jane@example.com',
    subject: 'An unread message example',
    body: 'All new messages are displayed like this. Viewing the message marks it as unread.',
    sentAt: new Date('April 20, 2022 15:34:36'),
    unread: true,
  },
];

const faqData = [
  {
    question: 'What is your address?',
    answer: '123 Sesame Street.',
    pinned: true,
  },
  {
    question: 'How do I make a reservation?',
    answer: 'Call us on 0812 345 6789.',
    pinned: true,
  },
  {
    question: 'Where can I make a complaint?',
    answer: 'Use our contact form to inform us of your experience.',
    pinned: true,
  },
  {
    question: 'Can I leave a review?',
    answer: "We'd appreciate it if you could leave us a positive review on Google.",
    pinned: false,
  },
];

dishData.forEach(doc => {
  Dish.seed(doc);
});

staffData.forEach(doc => {
  Staff.seed(doc, doc.password);
});

messageData.forEach(doc => {
  Message.seed(doc);
});

faqData.forEach(doc => {
  FAQ.seed(doc);
});

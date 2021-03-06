require('dotenv').config();
require('./auth/passport');

const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const pageRouter = require('./routes/pageRoutes');
const authRouter = require('./routes/authRoutes');
const staffRouter = require('./routes/staffRoutes');

const error = require('./controllers/errorController');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.engine('mst', mustacheExpress(`${__dirname}/views`, '.mst'));
app.set('view engine', 'mst');

app.use('/', pageRouter);
app.use('/', authRouter);
app.use('/staff',
  passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/login',
  }),
  staffRouter,
);
app.get('*', error.notFound);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Listening on http://${process.env.HOST}:${process.env.PORT}`);
});

require('dotenv').config();

const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const passport = require('passport');
const session = require('express-session');
const SQLiteStore = require('@gristlabs/connect-sqlite3')(session);

const { passportAuthCheck } = require('./middleware/passport');

const pageRouter = require('./routes/pageRoutes');
const authRouter = require('./routes/authRoutes');
const staffRouter = require('./routes/staffRoutes');

app.use(express.static('public'));
app.use(express.urlencoded({ extended:false }));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: process.env.SESSION_DB_PATH })
}));
app.use(passport.authenticate('session'));

app.engine('mst', mustacheExpress(`${__dirname}/views`, '.mst'));
app.set('view engine', 'mst');

app.use('/', pageRouter);
app.use('/', authRouter);
app.use(passportAuthCheck);
app.use('/staff', staffRouter);
app.get('*', (_, res) => res.redirect('/'));

app.listen(process.env.PORT, process.env.HOST, (req, res) => {
  console.log(`Listening on http://${process.env.HOST}:${process.env.PORT}`);
});

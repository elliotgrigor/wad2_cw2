require('dotenv').config();

const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const pageRouter = require('./routes/pageRoutes');
const authRouter = require('./routes/authRoutes');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:false }));

app.engine('mst', mustacheExpress(`${__dirname}/views`, '.mst'));
app.set('view engine', 'mst');

app.use('/', pageRouter);
app.use('/', authRouter);

app.listen(process.env.PORT, process.env.HOST, (req, res) => {
  console.log(`Listening on http://${process.env.HOST}:${process.env.PORT}`);
});

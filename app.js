require('dotenv').config();

const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');

const pageRouter = require('./routes/pageRoutes');

app.engine('mst', mustacheExpress(`${__dirname}/views`, '.mst'));
app.set('view engine', 'mst');

app.use('/', pageRouter);

app.listen(process.env.PORT, process.env.HOST, (req, res) => {
  console.log(`Listening on http://${process.env.HOST}:${process.env.PORT}`);
});

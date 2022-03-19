require('dotenv').config();

const express = require('express');
const app = express();

const pageRouter = require('./routes/pageRoutes');

app.use('/', pageRouter);

app.listen(process.env.PORT, process.env.HOST, (req, res) => {
  console.log(`Listening on http://${process.env.HOST}:${process.env.PORT}`);
});

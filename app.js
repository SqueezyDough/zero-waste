'use strict';

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
// Add to create new dataset
// const data = require('./controllers/data.controller');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app
  .use('/static', express.static(path.join(__dirname, 'static')))
  .set('view engine', 'hbs')
  .engine('hbs', exphbs({
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: '.hbs'
  }))
  .get('/', (req, res) => {
    res.render('home');
  })
  .listen(port, () => console.log(`App listening on port ${port}!`));

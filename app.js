//Create constances
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const promisify = require('es6-promisify');
const routes = require('./routes/index');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');

//create express app
const app = express();

//view engine setup. Using Pug in views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//use routes
app.use('/', routes);

//export module so it can be started in start file
module.exports = app;
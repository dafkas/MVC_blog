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

const db = require('./db.js')

//create express app
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

//view engine setup. Using Pug in views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Helpers to template
app.use((req, res, next) => {
    res.locals.h = helpers
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//use routes
app.use('/', routes);

//export module so it can be started in start file
module.exports = app;
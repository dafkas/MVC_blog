//Create constances
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const promisify = require('es6-promisify');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');
const flash = require('connect-flash');
const helmet = require('helmet');
const expressValidator = require('express-validator');


//create express app
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

//view engine setup. Using Pug in views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//helmet for protection
app.use(helmet())

//model validation
app.use(expressValidator());

//cookies
app.use(cookieParser(process.env.SECRET, { expire: new Date(Date.now()) + 1800000 }));

//bodyParser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//passport initialize
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { expire: new Date(Date.now()) + 1800000 }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Helpers to template
app.use((req, res, next) => {
    res.locals.h = helpers
    res.locals.flashes = req.flash();
    res.locals.user = req.user || null;
    res.locals.url = req.originalUrl;
    next();
});

//require models, index.js
const models = require('./models');

//require routes, pzss app and password parameters
const routes = require('./routes/index.js')(app, passport);

//errorhandlers
app.use(errorHandlers.notFound);

//Change to development or production errors
if(process.env.NODE_ENV === 'development'){
    app.use(errorHandlers.developmentErrors);
}else{
    app.use(errorHandlers.productionErrors);
}

//Require middleware
require('./middleware/passport')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function() {
    console.log('Synchronize successfull');
}).catch(function(err) {
    console.log(err, 'Models could not be synched!');
});

//Insert first category, No category
 models.category.findOne({ where: {categoryId : 1 } }).then(category => {
    if(category == null){
        models.category.createCategory();
    }
 });

//export module so it can be started in start file
module.exports = app;


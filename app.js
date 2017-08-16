// Dependencies
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');

// Routes
let index = require('./routes/index');
let artist = require('./routes/artist');
let artwork = require('./routes/artwork');
let login = require('./routes/login');
let logout = require('./routes/logout');
let signup = require('./routes/signup');
let search = require('./routes/search');


// Models
let db = require('./models');

// Initialize App
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Authentication
let authentication = require('./authentication/passport')(app);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/artists', artist);
app.use('/artworks', artwork);
app.use('/search', search);
app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.user = req.user || null;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


db.sequelize.sync(
//  { force: true}
);

module.exports = app;

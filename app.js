const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const passport = require('passport')
const helmet = require('helmet')
const cors = require('cors')
const keys = require('./config/keys')
const authRouter = require('./routes/auth-routes')
const usersRouter = require('./routes/users');
const chatRouter = require('./routes/chat')
const aws = require('aws-sdk')
require('./db.js')
require('./config/passport-setup')

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', 1);
app.use(cors({
  origin: ['http://localhost:8080', 'https://crossingpaths.netlify.app', 'https://crossingpathsserver.herokuapp.com'],
  credentials: true
}));

aws.config.update({
  accessKeyId: keys.aws.accessKeyId,
  secretAccessKey: keys.aws.secretAccessKey
})


app.use(helmet())
app.use(logger('dev'));
app.use(express.json());


app.use(cookieSession({
  name: 'crossing-session',
  key: [keys.session.cookieKey],
  secret: keys.session.cookieSecret,
  httpOnly: true,
  secure: true,
  SameSite: 'none',
  domain: 'crossingpaths.netlify.app',
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(passport.initialize());
app.use(passport.session());


const isLoggedIn = (req, res, next) => {
  // console.log(req.session);

  if (req.user) {
    global.loggedUser = req.user[0]
    next()
  }
  else res.sendStatus(403)
}

app.use('/', (req, res, next) => {
  console.log(req.user);
  next()
})

app.use('/auth', authRouter);
app.use('/users',
  isLoggedIn,
  usersRouter);
app.use('/chat',
  isLoggedIn,
  chatRouter)

app.post('/logout', (req, res) => {
  req.session = null;
  req.logOut();
  res.sendStatus(301)
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

var indexRouter = require('./routes');
var usersRouter = require('./routes/users');
var jokesRouter = require('./routes/jokes');
const {fetchMultipleJokes} = require("./services/jokeService");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/joke', jokesRouter);


const connectDB = async () => {
  try {
    console.log("Connecting to db...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Database connection failed:', error);
    setTimeout(connectDB, 3000); // Повторне підключення через 3 сек
  }
};

const start = async ()=>{
  try {

    await connectDB()
    await app.listen(process.env.PORT, process.env.HOST)
    console.log(`Server listening on ${process.env.PORT} `)
  }catch (e) {
  console.log(e)
}}

start()
fetchMultipleJokes(10);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

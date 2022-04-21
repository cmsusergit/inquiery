var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dept=require('./routes/dept')
const course=require('./routes/course')
const branch=require('./routes/branch')
const inquery=require('./routes/inquery')

const tag=require('./routes/tag')
var app = express();
const cor1=require('cors')
app.use(cor1())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/build')));               

app.use('/', indexRouter);
app.use('/dbapi/user', usersRouter);
app.use('/dbapi/dept',dept)
app.use('/dbapi/inquery', inquery);
app.use('/dbapi/course',course)
app.use('/dbapi/tag',tag)
app.use('/dbapi/branch',branch)
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
  res.json('error');
});
module.exports = app;



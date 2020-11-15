require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const cors = require('cors')

require('./models/db');

const workoutRouter = require('./routes/workout');
const workoutsRouter = require('./routes/workouts');
const authenticationRouter = require('./routes/authentication');
const logRouter = require('./routes/log');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/workout', workoutRouter);
app.use('/workouts', workoutsRouter);
app.use('/auth', authenticationRouter);
app.use('/log', logRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  res.json({
    "message": 'Unknown endpoint.'
  });
});

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({
      "message": err.name + ": " + err.message
    });
  }
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Return error as json
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

module.exports = app;

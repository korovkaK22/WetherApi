const express = require('express');
const logger  = require('morgan');

const { weatherRouter }      = require('./controllers/weatherController');
const { subscriptionRouter } = require('./controllers/subscriptionController');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', weatherRouter);
app.use('/api', subscriptionRouter);

// 404
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

module.exports = app;   // ❗ без .listen()

const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// controllers
const viewPaste = require('./controllers/viewPaste');
const getPaste = require('./controllers/getPaste');
const createPaste = require('./controllers/createPaste');
const entryCheck = require('./controllers/entryCheck');

// middlewares
const getDbResult = require('./middlewares/getDbResult');
const checkTime = require('./middlewares/checkTime');
const checkViews = require('./middlewares/checkViews');
const decrementViews = require('./middlewares/decrementViews');

app.use(express.static("public"));
app.use(express.json());


app.post('/api/pastes', createPaste);  // create paste

app.get('/api/pastes/:id', getDbResult, checkTime, checkViews, decrementViews, getPaste);    // get paste (API)

app.get('/p/:id', getDbResult, checkTime, checkViews, decrementViews, viewPaste);            // view paste (HTML)

app.get('/api/healthz', entryCheck);    // health check

module.exports = app;
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;


const viewPaste = require('./controllers/viewPaste');
const getPaste = require('./controllers/getPaste');
const createPaste = require('./controllers/createPaste');
const entryCheck = require('./controllers/entryCheck');

app.use(express.json());




app.post('/api/pastes', createPaste);  // create paste

app.get('/api/pastes/:id', getPaste);    // get paste (API)

app.get('/p/:id', viewPaste);            // view paste (HTML)

app.get('/api/healthz', entryCheck);    // health check

app.listen(port, ()=> {
    console.log(`Server is listening on the port ${port}...`);
});
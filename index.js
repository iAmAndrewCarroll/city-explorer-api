// Building an Express Server
'use strict';
require('dotenv').config();

const express = require('express');

const cors = require('cors');

const weather = require('./data/weather.json');

// this is the 'actual server' and line 12 invokes it
const app = express();

// invoke cors
app.use(cors());

// this creates localhost:3001
const PORT = process.env.PORT || 3001;

// this creates localhost:3001/hello
// (request, response) is required
app.get('/weather', (request, response) => {
  response.send("hello weather");
});


app.listen(PORT, () => console.log(`server listening on ${PORT}`));

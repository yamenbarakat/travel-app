let tripData = {};

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

/* Middleware*/

// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

// Cors for cross origin allowance
app.use(cors());

// point the server to the main project folder
app.use(express.static('dist'))

// post trip data
app.post('/postTrip', (req, res) =>{
  tripData = req.body;
  res.send(tripData);
})


module.exports = app;
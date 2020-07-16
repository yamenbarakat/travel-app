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


app.use(express.static('dist'))

app.listen(3000, () => {
    console.log('the app is listening')
})


// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.listen(8000, () => console.log('Server is running'));

// return the projectData object
app.get('/all', (req, res) => {
    console.log(projectData)
    res.send(projectData);
});

// post the weather data
app.post('/weather', (req, res) => {
    const wthrdata = req.body;
    projectData.temperature = wthrdata[0].main.temp;
    projectData.date = wthrdata[1].date;
    projectData.feelings = wthrdata[2].feelings; 
    res.send(req.body);
});
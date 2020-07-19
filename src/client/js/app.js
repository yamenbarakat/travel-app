/* Global Variables */

// to store all the needed data for the trip
const tripData = {}

// Geonames url, username and para
const baseGeo = 'http://api.geonames.org/searchJSON?';
const userName = '&username=yamenbarakat';
const paraGeo = '&maxRows=1';

// Weatherbit url and key api
const baseWthrUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const keyWthr = '&key=c6692bb0f86944599866726836674cdd';

// Pixabay api
const basePixUrl = 'https://pixabay.com/api/?';
const keyPix = 'key=17510514-f3918d85b0fe161f2e31575c3';
const paraPix = '&image_type=photo&category=travel&safesearch=true'

// DOM elements
const city = document.getElementById('city');
const form = document.getElementById('form');
const weatherTitle = document.getElementById('weather-info');
const country = document.getElementById('country');
const daysCounter = document.getElementById('days-counter');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const cityImg = document.querySelector('#city-img img')
const caption = document.querySelector('#city-img figcaption')


/* helper functions */

// store weather data
const storeWthrData = (data) => {
    tripData.highTemp = data.high_temp;
    tripData.lowTemp = data.low_temp;
    tripData.description = data.weather.description;
}

// check the days between the current date and the chosen one and store data
const setLeftDays = (daysLeft) => {
    if (daysLeft === 0) {
        tripData.daysLeft = 'today';
    } else if (daysLeft === 1) {
        tripData.daysLeft = 'tommorow'
    } else {
        tripData.daysLeft = daysLeft + ' days away'
    }
}


/* functions */

// the main func which calls all other functions
const chainCall = () => {
    // check if the user puts a city
    const cityVal = 'rome';
    if (cityVal === '' || cityVal.match(/\d/)) {
        alert('Please enter a city');
        return false
    }

    // call the url geonames
    const urlGeo = baseGeo + 'q=' + cityVal + paraGeo + userName;
    getGeo(urlGeo)

    // call the weatherbit by coordinates
    .then(data => {
        const urlWthr = baseWthrUrl + `lat=${data.lat}&lon=${data.lng}` + keyWthr;
        return getWthr(urlWthr)
    })

    // call the Pixabay url
    .then(() => {
        const pixUrl = basePixUrl + keyPix + '&q=' + cityVal + paraPix;
        return getImg(pixUrl);
    })

    // finally update the UI and post the tripData
    .then(() => {
        updateUI();
        //postData('/postTrip', tripData);
    })
};

// get the Geonames data of the provided city 
const getGeo = async(url) => {
    const request = await fetch(url);
    // transform data to JSON
    const data = await request.json();

    // store the first array
    const dataArray = data.geonames[0];

    // store the country of the provided city
    tripData.country = dataArray.countryName;

    return dataArray
};

// get the weatherbit data by coordinates 
const getWthr = async(url) => {
    const request = await fetch(url);
    // transform data to JSON
    const parsedData = await request.json();

    // store data arrays
    const wthrData = parsedData.data;

    // store the chosen date value
    const dateVal = '2020-07-20';

    // initilize a var to track the range of days between the current date and the chosen one
    let daysLeft = 0;

    // loop over the arrays to find a date that matches the chosen date
    for (const d of wthrData) {
        if (dateVal === d.datetime) {
            // call the helper func to store data
            storeWthrData(d);
            // call the helper func to check the days
            setLeftDays(daysLeft);
            return d
        }
        daysLeft++
    }
};

// get an img of the provided city
const getImg = async(url) => {
    const img = await fetch(url);
    // transform data to JSON
    const parseImg = await img.json();

    // store the img with its alt
    const firstArray = parseImg.hits[0];
    console.log(tripData)
    tripData.img = firstArray.largeImageURL;
    tripData.alt = firstArray.tags;
};

// post the city data
const postData = async(url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
   
    try {
        const parsedData = await response.json();
        return parsedData;
    } catch(err) {
        console.log(err)
        alert(err)
    }
};

// update UI
const updateUI = () => { 
    weatherTitle.textContent = 'Travel Info';
    country.innerHTML        = 'Country: '     + tripData.country;
    temp.innerHTML           = 'Temperature: ' + `high: ${tripData.highTemp},  low: ${tripData.lowTemp}`;
    description.innerHTML    = 'Description: ' + tripData.description;
    daysCounter.textContent  = 'The trip is '  + tripData.daysLeft;
    cityImg.src              = tripData.img;
    caption.textContent      = 'This is an image of ' + tripData.alt;
};


/* events */


    chainCall();



/* exports */


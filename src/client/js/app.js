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

const temp = document.getElementById('temp');
const content = document.getElementById('content');


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
        tripData.daysLeft = 'Today';
    } else if (daysLeft === 1) {
        tripData.daysLeft = 'Tommorow'
    } else {
        tripData.daysLeft = daysLeft
    }
}


/* functions */

// the main func which calls all other functions
const chainCall = () => {
    // check if the user puts a city
    const cityVal = city.value;
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
        getImg(pixUrl);
    })

    // finally post the tripData and update the UI
    .then(() => {
        console.log(tripData)
        postData('/postTrip', tripData)
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
    const dateVal = date.value;

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

    // store the img
    tripData.img = parseImg.hits[0].largeImageURL;
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
// const updateUI = async(projectData) => { 
//     // transform data to JSON
//     const pData = await projectData.json()

//     date.innerHTML = 'temperature: ' + pData.temperature;
//     temp.innerHTML = 'date: ' + pData.date;
    
//     // check if the person enters a value in the feelings box 
//     content.innerHTML = feelings.value ? 'feelings: ' + pData.feelings: '';
// };


/* events */

const formSub = form.addEventListener('submit', (e) => {
    e.preventDefault();
    chainCall();
})


/* exports */

export {
    chainCall,
    formSub
}
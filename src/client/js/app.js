/* Global Variables */

let tripData = {}

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
const paraPix = '&q=roma&image_type=photo&category=travel&safesearch=true'

// DOM elements
const city = document.getElementById('city');
const form = document.getElementById('form');

const temp = document.getElementById('temp');
const content = document.getElementById('content');


// get the Geonames data of the provided city 
const getGeo = async(url) => {
    const request = await fetch(url);
    // transform data to JSON
    const retrieved = await request.json();
    return retrieved
};


// helper func for tracking the days between the current date and the chosen one
const setLeftDays = (daysLeft) => {
    if (daysLeft === 0) {
        tripData.daysLeft = 'Today';
    } else if (daysLeft === 1) {
        tripData.daysLeft = 'Tommorow'
    } else {
        tripData.daysLeft = daysLeft
    }
    console.log(tripData)
}


// get the weatherbit data by coordinates 
const getWthr = async(url) => {
    const request = await fetch(url);
    // transform data to JSON
    const retrieved = await request.json();

    // cheack which weather matches the chosen date and track the day of it
    const dateVal = date.value;
    const wthrData = retrieved.data;
    let daysLeft = 0;
    for (const d of wthrData) {
        if (dateVal === d.datetime) {
            setLeftDays(daysLeft)
            return d
        }
        daysLeft++
    }
};


// post the retrieved weather data 
const postWthr = async(url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
   
    try {
        const resData = await response.json();
        console.log('retr', resData)
        return resData;
    } catch(err) {
        console.log(err)
        alert(err)
    }
  };

// GET the projectData
const getData = async() => {
    //const projectData = await fetch('/all');
    //updateUI(projectData)
    const img = await fetch(basePixUrl + keyPix + paraPix)
    const jos = await img.json()
    console.log(jos.hits[0].largeImageURL)
};


// update UI
const updateUI = async(projectData) => { 
    // transform data to JSON
    const pData = await projectData.json()

    date.innerHTML = 'temperature: ' + pData.temperature;
    temp.innerHTML = 'date: ' + pData.date;
    
    // check if the person enters a value in the feelings box 
    content.innerHTML = feelings.value ? 'feelings: ' + pData.feelings: '';
};


// get the weather data from OpenWeatherMap, then post the data, finally get the data to update the UI
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

    // store the retrieved country name and send its coordinates to fetch the weather
    .then(data => {
        const dataArray = data.geonames[0];
        tripData.country = dataArray.countryName;
        const lat = dataArray.lat;
        const lng = dataArray.lng;

        // call the url weather
        const urlWthr = baseWthrUrl + `lat=${lat}&lon=${lng}` + keyWthr;
        getWthr(urlWthr)
    })

    .then(data => {

    })
};

const formSub = form.addEventListener('submit', (e) => {
    e.preventDefault()
    chainCall()
})

export {
    chainCall,
    formSub
}
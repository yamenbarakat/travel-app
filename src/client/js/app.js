/* Global Variables */

// Geonames url and username
const baseGeo = 'http://api.geonames.org/searchJSON?q=roma&maxRows=1&username=yamenbarakat';

// Weatherbit url and key api
const baseWthrUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
const keyWthr = '&key=c6692bb0f86944599866726836674cdd';
const coordinates = '?lat=41.89193&lon=-12.51133';

// Pixabay api
const basePixUrl = 'https://pixabay.com/api/?';
const keyPix = 'key=17510514-f3918d85b0fe161f2e31575c3';
const paraPix = '&q=roma&image_type=photo&category=travel&safesearch=true'

const test = baseWthrUrl + coordinates + keyWthr;
const city = document.getElementById('city');
const formDate = document.getElementById('form-date');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'/'+ d.getDate()+'/'+ d.getFullYear();


// get the weather from weatherbit 
const weather = async(url) => {
    const request = await fetch(url);
    // transform data to JSON
    const retrieved = await request.json();
    // cheack the weather of the provided date
    const dateVal = date.value;
    const wthrData = retrieved.data;
    for (d of wthrData) {
        if (dateVal === d.datetime) {
            console.log(d);
            return true
        }
    }
    alert('please enter correct date')

};


// post the retrieved weather data 
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
        const resData = await response.json();
        return resData;
    } catch(err) {
        alert('Please enter the correct zip code') // I know that alert function should not be used in a real project. I only used it for serving time
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
    weather(test)

    //getData()
    //.then(data => postData('/weather', [data, {date: newDate}, {feelings: feelings.value}]))

    //.then(getData)
};

const formSub = formDate.addEventListener('submit', (e) => {
    e.preventDefault()
    chainCall()
})

export {
    chainCall,
    formSub
}
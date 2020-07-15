/* Global Variables */
const base = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const zipCode = document.getElementById('zip');
const keyApi = '&appid=a3c31c46e4a9ecc037aff3c4647c9615';
const generate = document.getElementById('generate');
const feelings = document.getElementById('feelings');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'/'+ d.getDate()+'/'+ d.getFullYear();


// get the weather from OpenWeatherMap 
const weather = async(url) => {
    const request = await fetch(url);
    // transform data to JSON
    const retrieved = await request.json();
    return retrieved;
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
    const projectData = await fetch('/all');
    updateUI(projectData)
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
    weather(base + zipCode.value + keyApi)

    .then(data => postData('/weather', [data, {date: newDate}, {feelings: feelings.value}]))

    .then(getData)
};


generate.addEventListener('click', () => {
    chainCall();
});
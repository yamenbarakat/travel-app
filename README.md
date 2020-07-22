# Travel App


## Introduction
The project has a simple form where you enter the location you are traveling to and the date you are leaving. And it displays a weather and an image of the location using information obtained from external APIs

## The project uses:
- Webserver - Node
- Web application framework for routing - Express
- Styling the page with Sass 
- Service workers
- Using APIs and creating requests to external urls
- Webpack tool, setting up dev and prod environments, each with their own set of tools and commands.
- installing @babel for using new ES6 syntax
- installing jest for testing functions

## Here is how it works :
You enter a city and a date - the date is limited to 16 days- and then click on submit,
The Geonames API is called to get the coordinates of the city,
The coordinates are used to get the weather data using Weatherbit API,
The Pixabay API is called to get an image based on the provided city, 
Once we get these data, we display them in the document and post them to the server.


### Note : from the Extend Options I used the localStorage option
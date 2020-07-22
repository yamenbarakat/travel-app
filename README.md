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
1. You start the express server by typing - npm start - Or you can use webpack server for development by typing - npm run dev -
2. You enter a city and choose a date - the date is limited to 16 days - and then click on submit.
** What would happen is:
* The Geonames API is called to get the coordinates of the city,
* The coordinates are used to get the weather data using Weatherbit API,
* The Pixabay API is called to get an image based on the provided city, 
* Once we get these data, we display them in the document and post them to the server.

## To develop the app
If you want to make changes to the app, you can run the webpack development mode by typing - npm run dev - and after you finish and are satisfied with changes, you need to take those changes for production. To do that run the webpack production by typing - npm run build -



### Note : from the Extend Options I used the localStorage option
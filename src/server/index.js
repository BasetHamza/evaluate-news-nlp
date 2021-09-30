// To use environment variables to mask the API Key
const dotenv = require('dotenv');
dotenv.config();

/* Empty JS object to act as endpoint for all routes */
projectData = [];

var path = require('path')
const mockAPIResponse = require('./mockAPI.js')

// You could call it aylienapi, or anything else
var textapi = {
  application_key: process.env.API_KEY,
};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express()

/* Dependencies */
const bodyParser = require('body-parser')

/*Middleware*/

// Here we are configuring express to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Telling body-parser exactly how we want our data to be dealt with. Which is using JSON.

// Cors for cross origin allowance - Let's the browser and server talk to each other without any security interruptions.
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// Creating a local server
const PORT = 8081 // designates what port the app will listen to for incoming requests

app.listen(PORT, listening);

function listening(){
    console.log("server running");
    console.log(`running on localhost: ${PORT}`);
}

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


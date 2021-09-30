// To use environment variables to mask the API Key
const dotenv = require('dotenv');
dotenv.config();

var FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

/* Empty JS object to act as endpoint for all routes */
projectData = [];

var path = require('path')
const mockAPIResponse = require('./mockAPI.js')

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

/* GET route that returns the projectData object */
app.get('/all',function(req,res){
    res.send(projectData);
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


/* POST route that adds incoming data to projectData */

// The POST route should anticipate receiving the url from the user from the request body
// url.
// It should then analyze the data using the meaning cloud API and push the retruned 
// analysis into the projectData to be returned to the app.

app.post('/addData', analyzeURL);

async function analyzeURL (req, res){
    let { url } = req.body;

    const formdata = new FormData();
    formdata.append("key", process.env.API_KEY);
    formdata.append("url", url);
    formdata.append("lang", "auto");

    const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
    };


    const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
    try{
        const data = await response.json();
        projectData = data;

        return data;
    } catch(error) {
        console.log("error",error);
    }


}

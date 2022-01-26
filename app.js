const express = require('express'); // import express module (simplifies routing/requests, among other things)
const app = express(); // create an instance of the express module (app is the conventional variable name used)
const fetch = require('node-fetch'); // import node-fetch (enables the fetch API to be used server-side)
const PORT = process.env.PORT || 5000; // use either the host env var port (PORT) provided by Heroku or the local port (5000) on your machine
var fs = require("fs");
var text = fs.readFileSync("./covmat.json");
var text2 = "test2"
var text2 = fs.readFileSync("./matrixnew.json")

app.get('/', (req, res) => { // send a get request to root directory ('/' is this file (app.js))
  fetch('https://www.boredapi.com/api/activity') // fetch activity from bored API - https://www.boredapi.com/about
    .then(res => res.json()) // return a promise containing the response
    .then(json => res.send(`<h1>Today's Activity: ${json.activity}!</h1> <p>But make the bed first</p> <p>${text}</p> <p>${text2}</p>`)) // extract the JSON body content from the response (specifically the activity value) and sends it to the client
    .catch(function(err){ // catch any errors
      console.log(err); // log errors to the console
    })
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.get('/matrix',(req,res,next) => {
  res.send(JSON.parse(text));
})

app.listen(PORT, () => { // start server and listen on specified port
  console.log(`App is running on ${PORT}`) // confirm server is running and log port to the console
}) 

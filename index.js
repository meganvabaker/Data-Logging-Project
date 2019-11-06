const express = require('express'); //express variable equals require node 'express'
const Datastore = require('nedb'); //Datastore variable equals require 'nebd' database

const app = express(); //app variable equals express
const port = process.env.PORT || 3000; //uses port number 3000 if running locally and allocates a port number if running externally
app.listen(port, () => { 
    console.log(`Starting server at ${port}`); //when host is working console will display 'Starting server at -'
});
app.use(express.static('public')); //use is a method to configure middleware used by the routes of the Express HTTP server object
app.use(express.json({limit: '1mb'})); //will allow through JSON bodies of up to 1mb

const database = new Datastore('database.db'); //database variable equals new Datastore in database.db file
database.loadDatabase(); //calling loadDatabase

app.post('/api', (request, response) => { //app.post handles POST requests
    const data = request.body; //data equals request of the body
    const timestamp = Date.now(); //timestamp variable equals current Date
    data.timestamp = timestamp; //data dot timestamp equals timestamp
    database.insert(data); //insertion of the database
    response.json(data); //response to request 'data'
});

app.get('/api', (request, response) => { //app.get handles GET requests
    database.find({}).sort({timestamp: 1}).exec(function (err,docs){
        if (err) { //if statement for errors
            console.log(err); //console logging 'err'
            response.end(); //end method causes server to stop processing the script
            return; //and return the current result
        }
        response.json(docs); //response to request 'docs'
    });
});

const mongoose = require('mongoose');
const express = require('express');//This helps create a new express server.
const app = express(); //this helps creates a new express server.
const db = require('./config/keys').mongoURI; //import key/connection string

//connect to MongoDB using mongoose:
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

//setup basic route so that we can render some information on our page. 
app.get("/", (req, res) => res.send("Hello World!!!"));

//Before we can run the server, we need to tell our app which port to run on. Keeping in mind that we will later be deploying our app to Heroku, which requires us to run our server on:
const port = process.env.PORT || 5000; //locally our server will run on :localHhost: 5000

//Finally, let's tell Express to start a socket and listen for connections on the path.
app.listen(port, () => console.log(`Server is running on port: ${port}`));

// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');//This helps create a new express server.
const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');
const User = require('./models/User');//imported newSchema
const passport = require('passport');

const app = express(); //this helps creates a new express server.
const db = require('./config/keys').mongoURI; //import key/connection string

app.use(express.urlencoded({extended: true}));//respond to request from other software

//connect to MongoDB using mongoose:
mongoose
    .connect(db, 
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));
// app.use(bodyParer.urlencoded({extended:false}));repsond to other request like Postman
// app.use(bodyParser.json());respond to json request

//setup basic route so that we can render some information on our page. 
// app.get("/", (req, res) => {
//     const user = new User({
//         handle: "myke",
//         email: "myke@myke.myke",
//         password: "myke"
//     })
//     user.save()
//     res.send("Hello World!!!")});
//Tell express to use your newly imported routes(put them with your 'Hello world' route)
app.use('/api/users', users);
app.use("/api/tweets", tweets);

//setup middleware
app.use(passport.initialize());
require('./config/passport')(passport); //setup configuration file for Passport


//Before we can run the server, we need to tell our app which port to run on. Keeping in mind that we will later be deploying our app to Heroku, which requires us to run our server on:
const port = process.env.PORT || 5000; //locally our server will run on :localhost: 5000

//Finally, let's tell Express to start a socket and listen for connections on the path.
app.listen(port, () => console.log(`Server is running on port: ${port}`));

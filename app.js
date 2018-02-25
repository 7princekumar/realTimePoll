// npm run dev
const express    = require('express');
const path       = require('path'); //provides utilities for working with file and directory paths
const bodyParser = require('body-parser');
const cors       = require('cors'); //for cross domain functionality or authorisation

//DB Config
require('./config/db');

const app = express();

const poll = require('./routes/poll');

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//enable cors
app.use(cors());

app.use('/poll', poll); //anything that goes to /poll, it will be reflected on poll.js

//start server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server Started!"); 
});
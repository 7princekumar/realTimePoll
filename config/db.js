const mongoose = require('mongoose');

//Map global promises
mongoose.Promise = global.Promise;

//Mongoose Connect
mongoose.connect('mongodb://'+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+'@ds127506.mlab.com:27506/pusherpoll')
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));
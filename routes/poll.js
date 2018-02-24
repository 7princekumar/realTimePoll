const express = require('express');
const router  = express.Router();

const Pusher  = require('pusher');


var pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: 'ap2',
  encrypted: true
});
if(process.env.APP_ID && process.env.KEY && process.env.SECRET){
    console.log("All Pusher Keys present.");
} else {
    console.log("Pusher Keys missing.");
}

router.get('/', function(req, res){
    res.send('POLL');
});

router.post('/', function(req, res){
    pusher.trigger('os-poll', 'os-vote', {
    //   "message": "hello world"
        points: 1,
        os: req.body.os
    });
    
    return res.json({
        success: true,
        message: 'Thank you for voting'
    });
});

module.exports = router;
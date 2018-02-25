const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote');

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
    Vote.find().then(votes => res.json({success: true, votes: votes}));
});

router.post('/', function(req, res){
    const newVote = {
        os: req.body.os,
        points: 1
    }
    
    new Vote(newVote).save().then(vote => {
         pusher.trigger('os-poll', 'os-vote', {
            //"message": "hello world"
            points: parseInt(vote.points),
            os: vote.os
        });
    });
    
   
    
    return res.json({
        success: true,
        message: 'Thank you for voting'
    });
});

module.exports = router;
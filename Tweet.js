//model/tweet.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Defines what it means to be a tweet in the app
const TweetSchema = new Schema({
    //someone who made this tweet/an active record for association
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'//name of model we want to associate with
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//pass into mongoose.model(pass in tweet, and tweetSchema)/actual mongoose model / export
const Tweet = mongoose.model('tweet', TweetSchema);
module.exports = Tweet;
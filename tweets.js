const express = require('express');
const router = express.Router();
const passport = require('passport');
const validateTweetInput = require('../../validation/tweets');
const Tweet = require('../../models/Tweet');

router.get('/test', (req, res) => {
    res.json({msg: "This is the tweets route" })
});

// router.get('/', (req, res) => {
//     Tweet.find()
//         .sort({ date: -1})
//         .then(tweets => res.json(tweets))
//         .catch(err => res.status(400).json({ notweetsfound: 'No tweets found'}));
// });

// router.get('/user/:user_id', (req, res) => {
//     Tweet.find({user: req.params.user_id})
//         .then(tweets => res.json(tweets))
//         .catch(err => 
//             res.status(400).json({ notweetsfound: 'No tweets found from that user'}
//         )
//     );
// })

// router.get('/:id', (req, res) => {
//     Tweet.findById(req.params.id)
//         .then(tweet => res.json(tweet))
//         .catch(err =>
//             errors.status(404).json({ notweetfound: 'No tweet found with that ID'}
//         )
//     );
// });

//use passport middleware function along with the string 'jwt' to indicate which strategy to use and a configuration object(session: false)
router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {

    //destruction
    const { errors, isValid } = validateTweetInput(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    }

    const newTweet = new Tweet({
        text: req.body.text,
        user: req.user.id
    });

    newTweet.save().then(tweet => res.json(tweet));
});
module.exports = router;
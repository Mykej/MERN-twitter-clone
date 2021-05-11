const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //help users access protected routes
const keys = require('../../config/keys');
const passport = require('passport');


router.get('/test', (req, res) => {
    res.json({msg: "This is the users route"}) //send back a json string that looks like the object that is passed in
});
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        msg: 'Success',
        id: req.user.id,
        handle: req.user.handle,
        email: req.user.email
    });
})
router.post('/register', (req, res) => {
    // Check to make sure nobody has already registered with a duplicate email
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
            // Throw a 400 error if the email address already exists
                return res.status(400).json({email: "A user has already registered with this address"})
        } else {
          // Otherwise create a new user
        const newUser = new User({
            handle: req.body.handle,
            email: req.body.email,
            password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            })
        })}
    })
})
//post request to login path, (req, res) is a handler.
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
    .then(user => {
        if (!user) {
            return res.status(404).json({email: 'This user does not exist'});
        }

        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
                const payload = {//payload we want to send back
                    id: user.id, 
                    handle: user.handle,
                    email: user.email
                };

                //use jwt module to create this jwt
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    //tell the key to expire in one hour
                    {expiresIn: 3600},
                    (err, token) => {//callback that returns an error or token if it is created
                        res.json({
                            success: true,//success message to be returned
                            token: "Bearer " + token//token to be returned with message
                        });
                    });
            } else {
                return res.status(400).json({password: 'Incorrect password'});
            }
        })
    })
})

module.exports = router;
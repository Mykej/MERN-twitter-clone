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
// router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
//     res.json({
//         id: req.user.id,
//         handle: req.user.handle,
//         email: req.user.email
//     });
// })
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    }
    // check to make sure nobody has already registered with a duplicate email
    User.findOne({ handle: req.body.handle })
    .then(user => {
        if (user) {
            // Throw a 400 error if the email address already exists
            errors.handle = "User already exists";
            res.status(400).json(errors);
        } else {
            //Otherwise create a new user
            const newUser = new User({
                handle: req.body.handle,
                email: req.body.email,
                password: req.body.password
            });

            //Going to encrypt and salt password created by the user
            bcrypt.genSalt(10, (err, salt) => {
                //arguments: 1st is the thing we want to hash and the 2nd is the salt
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash; //set equal to the hash
                    newUser.save() //save the user and password and return a promise
                        .then((user) => {//send this back to the frontend
                            const payload = { id: user.id, handle: user.handle};

                            jwt.sign(payload, keys.secretOrKey, {expires: 3600}, (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            });
                        })
                        .catch(err => console.group(err));
                });
            });
            res.status(200).console.log({msg: "You are updated"});
        }
    });
});
//post request to login path, (req, res) is a handler.
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const handle = req.body.handle;
    const password = req.body.password;

    User.findOne({ handle })//returns a promise
    .then(user => {//user is argument
        if(!user){//let the frontend know user doesn't exist
            errors.handle = "This user does not exist.";
            res.status(400).json(errors);
        }

        bcrypt.compare(password, user.password)//if user is available check password and users password for match. returns a promise '.then'
        .then(isMatch => {
            if (isMatch) {
                const payload = {//includes all the user information needed for signed jwt.
                    id: user.id, 
                    handle: user.handle, 
                    email: user.email
                };

                jwt.sign(
                    payload,//line 86
                    keys.secretOrKey,//keys.js
                    //Tell the key to expire in one hour
                    {expiresIn: 3600},//jwt expiration time
                    (err, token) => {//callback function for once jwt has been created
                        res.json({//json object
                            success: true,
                            token: 'Bearer ' + token
                    });
                });
            } else {//if '!isMatch'
                errors.password = "Incorrect Password";
                res.status(400).json(errors);
            }
        });
    });
});

module.exports = router;
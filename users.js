const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken'); //help users access protected routes
const keys = require('../../config/keys');


router.get('/test', (req, res) => {
    res.json({msg: "This is the users route"}) //send back a json string that looks like the object that is passed in
});
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
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then((user) => {
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
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const handle = req.body.handle;
    const password = req.body.password;

    User.findOne({ handle })
    .then(user => {
        if(!user){
            errors.handle = "This user does not exist.";
            res.status(400).json(errors);
        }

        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
                const payload = {id: user.id, handle: user.handle};

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    //Tell the key to expire in one hour
                    {expiresIn: 3600},
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                    });
                });
            } else {
                errors.password = "Incorrect Password";
                res.status(400).json(errors);
            }
        });
    });
});

module.exports = router;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const keys = require('../config/keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//method used to extract jwt token from the header
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    //arguments: use ceretain strategy which takes two arguments, options we created line 7 and a call back. callback takes two arguments, 1: jwt_payload: items we have specified... and done which is a keyword/passes data to frontend.
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        user.findById(jwt_payload.id)
        .then(user => {
            if(user) {
                //return the user to the frontend
                return done(null, user);
            }
            //return false since there is no user
            return done(null, false);
        })
        //This payload includes the items we specified earlier
        .catch(err => console.log(err));
    }));
};
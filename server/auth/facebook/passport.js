const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;


import {userService} from '../../services/users';
import co from 'co';

exports.setup = function(config) {
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            co(function*() {
                try {
                    let user = yield userService.manageFacebookUser(accessToken, refreshToken, profile);
                    console.log(user);
                    return done(null, user);
                } catch (err) {
                    return done(err);
                }

            })

        }
    ));
};

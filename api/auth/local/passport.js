var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

import {userService} from '../../services/users';
import co from 'co';


export function setup() {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password' // this is the virtual field on the model
        },
        function(email, password, done) {
            co(function*() {
                try {
                    let user = yield userService.getUserByEmail(email);
                    if (!user) {
                        return done(null, false, {
                            message: 'This email is not registered.'
                        });
                    }
                    if (!userService.comparePassword(password, user.password)) {
                        return done(null, false, {
                            message: 'This password is not correct.'
                        });
                    }
                    return done(null, user);

                } catch (err) {
                    done(err);
                }
            })
        }
    ));
};

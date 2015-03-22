const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
import appRoot from 'app-root-path';
const servicePath = appRoot + '/services/users'

import userService from servicePath;
import co from 'co';

exports.setup = function (config) {
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      co(function*(){
        try{
          let user=yield manageFacebookUser(accessToken, refreshToken, profile);
          return done(null,user);  
        }
        catch(err){
          return done(err);
        }

      })

    }
  ));
};

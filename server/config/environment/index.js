'use strict';

var path = require('path');
var _ = require('lodash');

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 8080,

    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'giafra'
    },

    // List of user roles
    userRoles: ['guest', 'user', 'admin'],

    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    },

    facebook: {
        clientID: process.env.FACEBOOK_ID || '398094186943670',
        clientSecret: process.env.FACEBOOK_SECRET || '524d637c19b097231a24a91d377a45f7',
        callbackURL: (process.env.DOMAIN || '') + '/auth/facebook/callback'
    },
    mailer: {
        from: process.env.MAILER_FROM || 'MAILER_FROM',
        options: {
            service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
            auth: {
                user: process.env.MAILER_EMAIL_ID || 'gianluca.supino@gmail.com',
                pass: process.env.MAILER_PASSWORD || 'supino71'
            }
        }
    }

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {});

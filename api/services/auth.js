'use strict';

const config = require('../config/environment');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const compose = require('composable-middleware');
const validateJwt = expressJwt({ secret: config.secrets.session });

import co from 'co';
import {userService} from './users';



/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
    return compose()
        // Validate jwt
        .use(function(req, res, next) {
            // allow access_token to be passed through query parameter as well
            if (req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = 'Bearer ' + req.query.access_token;
            }
            var token = null;
            if (req.headers.authorization) {
                var bits = req.headers.authorization.split(' ');
            } else {
                return res.send(401);
            }
            if (bits.length == 2) {
                var scheme = parts[0];
                var credentials = parts[1];
                if (/^Bearer$/i.test(scheme)) {
                    token = credentials;
                    jwt.verify(token, config.secret, function(err, decoded) {
                        if (err) res.send(401);
                    });
                }
            } else {
                res.send(401);
            }
            validateJwt(req, res, next);
        })
        // Attach user to request
        .use(function(req, res, next) {
            co(function*() {
                try {
                    let user = yield userService.read(req.user._id);
                    if (!user) return res.send(401);

                    req.user = user;
                    next();
                } catch (err) {
                    next(err);
                }
            })
        })
}


/**
 * Attaches the user object to the request only if authenticated
 *
 */
export function isLogged() {
    return compose()
        // Validate jwt
        .use(function(req, res, next) {
            // allow access_token to be passed through query parameter as well
            if (req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = 'Bearer ' + req.query.access_token;
            }
            var token = null;
            if (req.headers.authorization) {
                var bits = req.headers.authorization.split(' ');
            } else {
                return next();
            }
            if (bits.length == 2) {
                var scheme = parts[0];
                var credentials = parts[1];
                if (/^Bearer$/i.test(scheme)) {
                    token = credentials;
                    jwt.verify(token, config.secret, function(err, decoded) {
                        if (err) next();
                    });
                }
            } else {
                next();
            }
            validateJwt(req, res, next);
        })
        // Attach user to request
        .use(function(req, res, next) {
            co(function*() {
                try {
                    let user = yield userService.read(req.user._id);
                    if (!user) return next();

                    req.user = user;
                    next();
                } catch (err) {
                    next(err);
                }
            })
        })
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired) {
    if (!roleRequired) throw new Error('Required role needs to be set');

    return compose()
        .use(isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
            if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
                next();
            } else {
                res.send(403);
            }
        });
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id) {
    return jwt.sign({
        _id: id
    }, config.secrets.session, {
        expiresInMinutes: 60 * 5
    });
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req, res) {
    if (!req.user) return res.json(404, {
        message: 'Something went wrong, please try again.'
    });
    var token = signToken(req.user._id, req.user.role);
    res.cookie('token', JSON.stringify(token));
    res.redirect('/');
}

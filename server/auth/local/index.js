'use strict';

const express = require('express');
const passport = require('passport');

import * as authService from '../../services/auth';

const router = express.Router();

router.post('/', function(req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }

    passport.authenticate('local', function(err, user, info) {
        var error = err || info;
        if (error) return res.status(401).send(error);
        if (!user) return res.status(404).send({
            message: 'Something went wrong, please try again.'
        });

        var token = authService.signToken(user._id, user.role);
        res.status(200).send({
            token: token
        });
    })(req, res, next)
});

module.exports = router;

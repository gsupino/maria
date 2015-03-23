'use strict';

const express = require('express');
const passport = require('passport');

import * as authService from '../../services/auth';

const router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    failureRedirect: '/signup',
    session: false
  })
  )
  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/signup',
    session: false
  }), authService.setTokenCookie);

module.exports = router;
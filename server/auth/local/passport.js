'use strict';

const express = require('express');
const passport = require('passport');
const User = require('../api/user/user.model');

// Passport Configuration
require('./local/passport').setup(User, config);
require('./facebook/passport').setup(User, config);


const router = express.Router();

router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));


module.exports = router;

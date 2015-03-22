'use strict';

const express = require('express');
const passport = require('passport');
const config = require('../config/environment');

// Passport Configuration
require('./local/passport').setup();
require('./facebook/passport').setup(config);



const router = express.Router();

router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));


module.exports = router;

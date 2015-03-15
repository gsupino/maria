'use strict';

const express = require('express');
const passport = require('passport');
import {userService} from '../../services/users';

// Passport Configuration
require('./local/passport').setup(userService);
//require('./facebook/passport').setup(userService);


const router = express.Router();

router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));


module.exports = router;

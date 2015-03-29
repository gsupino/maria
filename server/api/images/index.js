'use strict';

const express = require('express');
import * as controller from './images.controller';
//const config = require('../../config/environment');
//const auth = require('../../auth/auth.service');

const router = express.Router();

router.get('/', controller.find);
router.get('/:id',controller.read);

router.post('/',controller.create);

//router.delete('/:id', auth.hasRole('admin'), controller.destroy);


module.exports = router;


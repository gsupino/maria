'use strict';

const express = require('express');
import * as controller from './users.controller';
//const config = require('../../config/environment');
//const auth = require('../../auth/auth.service');

const router = express.Router();

router.get('/', controller.find);
router.post('/',controller.create);

router.post('/password',controller.changePassword);

router.get('/:id',controller.read);
router.put('/:id',controller.update);

//router.delete('/:id', auth.hasRole('admin'), controller.destroy);
//router.get('/me', auth.isAuthenticated(), controller.me);
//router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
//router.get('/:id', auth.isAuthenticated(), controller.show);
//router.put('/:id',auth.isAuthenticated,controller.update);
//router.post('/', controller.create);

module.exports = router;


'use strict';

'use strict';

const express = require('express');
const controller = require('./users.controller');
//const config = require('../../config/environment');
//const auth = require('../../auth/auth.service');

const router = express.Router();

router.get('/', controller.index);
//router.delete('/:id', auth.hasRole('admin'), controller.destroy);
//router.get('/me', auth.isAuthenticated(), controller.me);
//router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
//router.get('/:id', auth.isAuthenticated(), controller.show);
//router.put('/:id',auth.isAuthenticated,controller.update);
//router.post('/', controller.create);

module.exports = router;


'use strict';

const express = require('express');
import * as controller from './recipes.controller';

const router = express.Router();

router.get('/', controller.find);
router.post('/',controller.create);


router.get('/:id',controller.read);
router.put('/:id',controller.update);
router.delete('/:id',controller.remove);


module.exports = router;


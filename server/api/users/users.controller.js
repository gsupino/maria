'use strict';
import {userService} from '../../services/users';
import co from 'co';

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function (req, res) {
	co(function*(){
		let users=yield userService.list();
		res.send(users);
	})

};


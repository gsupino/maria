'use strict';
import {userService} from '../../services/users';
import co from 'co';


export function find(req, res) {
    co(function*() {
        try {
            let users = yield userService.find();
            res.send(users);

        } catch (e) {
            return e;
        }

    })
};

export function read(req, res) {
    co(function*() {
        try {
            let id = req.params.id;
            let users = yield userService.read(id);
            res.send(users);

        } catch (e) {
            return e;
        }

    })
};

export function create(req, res) {
    co(function*() {
        try {
            let user = yield userService.create(req.body);
            res.send(user);
        } catch (e) {
            return e;
        }
    })
};

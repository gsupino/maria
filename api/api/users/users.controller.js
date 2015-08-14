'use strict';
import {userService} from '../../services/users';
import co from 'co';


export function find(req, res) {
    co(function*() {
        try {
            let users = yield userService.find();
            res.send(users);

        } catch (e) {
            res.status(401).send(e);
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
            res.status(401).send(e);
        }

    })
};

export function create(req, res) {
    co(function*() {
        try {
            let user = yield userService.create(req.body);
            res.send(user);
        } catch (e) {
            res.status(401).send(e);
        }
    })
};

export function update(req, res) {
    co(function*() {
        try {
            let id = req.params.id;
            let file = req.files.file || null
            let oldUser = req.user; //doc user presente perchè autenticato
            let user = yield userService.update(id, req.body, oldUser, file);
            res.send(user);
        } catch (e) {
            res.status(401).send(e);

        }
    })
};

export function changePassword(req, res) {



};


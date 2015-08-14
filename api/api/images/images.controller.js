'use strict';
import {imageService} from '../../services/image';
import co from 'co';


export function find(req, res) {
    co(function*() {
        try {
            let users = yield imageService.find();
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
            let users = yield imageService.read(id);
            res.send(users);

        } catch (e) {
            res.status(401).send(e);
        }

    })
};

export function create(req, res) {
    co(function*() {
        try {
            let image = yield imageService.create(req.files.file, req.body.userId);
            res.send(image);
        } catch (e) {
            res.status(401).send(e);
        }
    })
};

export function remove(req, res) {
    co(function*() {
        try {
            let id = req.params.id;
            let image = yield imageService.remove(id);
            res.send(image);
        } catch (e) {
            res.status(401).send(e);
        }
    })
};

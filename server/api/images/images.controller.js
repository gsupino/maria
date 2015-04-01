'use strict';
import {imageService} from '../../services/image';
import co from 'co';


export function find(req, res) {
    co(function*() {
        let users = yield imageService.find();
        res.send(users);
    })
};

export function read(req, res) {
    co(function*() {
        let id = req.params.id;
        let users = yield imageService.read(id);
        res.send(users);
    })
};

export function create(req, res) {
    co(function*() {
        try {

            let image = yield imageService.create(req.files.file, req.body.userId);
            res.send(image);
        } catch (e) {
            console.log('err');
            console.dir(e.Error);
            e.error.details.forEach(function(detail) {
                errors.push({
                    key: detail.path,
                    message: detail.message
                });
            });
        }
    })
};

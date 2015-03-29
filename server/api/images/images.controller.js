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
    co(function*(){
            try{
                console.log(req.files)

                let user=yield imageService.create(req.files.file);
                res.send(user);
            }
            catch(e){
                console.log('err');
                console.log(e);
            }
    })
};

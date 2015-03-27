'use strict';
import {userService} from '../../services/users';
import co from 'co';


export function find(req, res) {
    co(function*() {
        let users = yield userService.find();
        res.send(users);
    })
};

export function read(req, res) {
    co(function*() {
        let id = req.params.id;
        let users = yield userService.read(id);
        res.send(users);
    })
};

export function create(req, res) {
    co(function*(){
            try{
                let user=yield userService.create(req.body);
                console.log(user)
                res.send(user);
            }
            catch(e){
                console.log('err');
                console.log(e);
            }
    })
};

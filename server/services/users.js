'use strict'
import co from 'co'
import {adapterMongo} from '../adapters/adapterMongo';
import validator from 'lx-valid';

//import {Adapter} from './adapter'

class UserService {
    constructor(adapter) {
        this.adapter = adapterMongo;
        this.collection = 'users';
    }

    find() {
        let self = this;
        return co(function*() {
            try {
                return yield self.adapter.getQuery(self.collection, {}, {});
            } catch (e) {
                return e;
            }
        })
    }

    read(id) {
        let self = this;
        return co(function*() {
            try {
                return yield self.adapter.getById(self.collection, id);
            } catch (e) {
                return e;
            }
        })
    }

}

export let userService = new UserService();

'use strict'
import co from 'co'
import {adapterMongo} from '../adapters/adapterMongo';
import validator from 'lx-valid';


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

    getUserByEmail(email, password) {
        let self = this;
        let email = email.toLowerCase();
        return co(function*() {
            try {
                return yield self.adapter.getOne(self.collection, {
                    email: email
                }, {});
            } catch (e) {
                return e;
            }
        })
    }

    comparePassword(password, passwordStored) {
        return password === passwordStored
    }


}

export let userService = new UserService();

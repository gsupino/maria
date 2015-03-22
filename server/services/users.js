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

    manageFacebookUser(accessToken, refreshToken, profile) {
        let self = this;
        return co(function*() {
            try {
                let user = yield self.adapter.getOne(self.collection, {
                    facebook: profile.id
                }, {});
                if (!user) {
                    user = {};
                    user.email = profile._json.email;
                    user.facebook = profile.id;
                    user.tokens.push({
                        kind: 'facebook',
                        accessToken: accessToken
                    });
                    user.profile.name = profile.displayName;
                    user.profile.gender = profile._json.gender;
                    user.profile.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                    user.role = 'user';
                    return yield self.adapter.create(user);

                }

            } catch (e) {
                return e;
            }
        })
    }


}

export let userService = new UserService();

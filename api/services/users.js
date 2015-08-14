'use strict'
import co from 'co'
import Joi from 'joi';
import {BaseService} from './base';
import {imageService} from './image';

Joi.objectId = require('joi-objectid');

const schema = {
    email: Joi.string().email().lowercase(),
    password: Joi.string(),
    provider: Joi.string(),
    facebook: Joi.string(),
    tokens: Joi.array(),
    profile: Joi.object().keys({
        name: Joi.string().default(''),
        gender: Joi.string().default(''),
        location: Joi.string().default(''),
        website: Joi.string().default(''),
        picture: Joi.string().default(''),
    }),
    resetPasswordToken: Joi.string(),
    resetPasswordExpires: Joi.date(),
    salt: Joi.string(),
    roles: Joi.object().keys({
        type: Joi.string().valid('user', 'admin')
    }),
    updated: Joi.date(),
    created: Joi.date().default(Date.now, 'time of creation'),
    image: Joi.objectId()
}


class UserService extends BaseService {
    constructor() {
        super('users')
    }

    create(doc) {
        let self = this;
        //Validate the parameters
        let err = Joi.validate(doc, schema);
        if (err.error) throw new Error(err);
        return co(function*() {
            try {
                //verificare se email è unica
                let checkEmail = yield self.adapter.getQuery(self.collection, {
                    email: doc.email
                }, {});
                if (checkEmail.length > 0) throw new Error('email already used');
                let user = yield self.adapter.create(self.collection, doc);
                return user;
            } catch (e) {
                throw e;
            }
        })
    }

    update(id, newDoc, oldDoc, file) {
        let self = this;
        //Validate the parameters
        let err = Joi.validate(doc, schema);
        if (err.error) throw new Error(err);
        return co(function*() {
            try {
                //gestione file picture
                if (file) {
                    //creo il doc della nuova image
                    let image = yield imageService.create(file, id);
                    newDoc.image = image._id;
                    //lo user aveva gia impostato una profile picture
                    if (oldDoc.image) {
                        //delete old imnage
                        let check = yield imageService.remove(oldDoc.image._id);
                    }
                }
                //lo user vuole il delete dell'immagine del profile 
                else {
                    if (oldDoc.image && !newDoc.image) {
                        //delete  image
                        let check = yield self.adapter.remove(self.collection, oldDoc.image._id)
                            //delete image field into doc user
                        check = yield self.adapter.removeField(self.collection, id, 'image');
                    }
                }
                let user = yield self.adapter.updateById(id, newDoc);
                return user;

            } catch (e) {
                throw e;
            }
        })
    }

    getUserByEmail(email, password) {
        let self = this;
        email = email.toLowerCase();
        return co(function*() {
            try {
                return yield self.adapter.getOne(self.collection, {
                    email: email
                }, {});
            } catch (e) {
                throw e;
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
                } else {
                    return user;
                }

            } catch (e) {
                throw e;
            }
        })
    }


}

export let userService = new UserService();

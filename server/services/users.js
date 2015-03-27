'use strict'
import co from 'co'
import {adapterMongo} from '../adapters/adapterMongo';
import Joi from 'joi';
import {BaseService} from './base';

Joi.objectId=require('joi-objectid');

const schema={
    email:Joi.string().email().lowercase(),
    password:Joi.string(),
    provider:Joi.string(),
    facebook:Joi.string(),
    tokens:Joi.array(),
    profile:Joi.object().keys({
        name:Joi.string().default(''),
        gender:Joi.string().default(''),
        location:Joi.string().default(''),
        website:Joi.string().default(''),
        picture:Joi.string().default(''),
    }),
    resetPasswordToken:Joi.string(),
    resetPasswordExpires:Joi.date(),
    salt:Joi.string(),
    roles:Joi.object().keys({
        type:Joi.string().valid('user', 'admin')
    }),
    updated:Joi.date(),
    created:Joi.date().default(Date.now),
    image:Joi.objectId()
}


class UserService extends BaseService{
    constructor() {
        super('users')
    }
    /*
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
    */
    create(doc){
        let self=this;
        //Validate the parameters
        let err=Joi.validate(doc,schema);
        if(err.error) throw new Error(err);
        return co(function*(){
            try{
                //verificare se email è unica
                let checkEmail=yield self.adapter.getQuery(self.collection,{email:doc.email},{});
               if (checkEmail.length>0) throw  new Error('email already used');
                let user= yield self.adapter.create(self.collection,doc);
                return user;
            }
            catch(e){
                return Promise.reject(e);
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
                }else{
                  return user;
                }

            } catch (e) {
                return e;
            }
        })
    }


}

export let userService = new UserService();

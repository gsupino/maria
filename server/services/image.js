'use strict'
import co from 'co'
import {adapterMongo} from '../adapters/adapterMongo';
import Joi from 'joi';

Joi.objectId=require('joi-objectid');

const schema={
	name:Joi.string().required(),
	originalname:Joi.string(),
	created:Joi.date().default(Date.now),
	caption:Joi.string(),
	size:Joi.number(),
	encoding:Joi.string(),
	mimetype:Joi.string(),
	extension:Joi.string(),
	user:Joi.objectId().required()
	storagepath:Joi.string(),
	assetpath:Joi.string()
}


class ImageService{
	constructor(adapter){
		this.adapter=adapterMongo;
		this.collection='Image';
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
	create(data,userId){

	}

	remove(){

	}

}
'use strict'
import co from 'co'
import Joi from 'joi';
import {BaseService} from './base';
import fs from 'co-fs';
import crypto from 'crypto';
import uuid from 'uuid';

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
	user:Joi.objectId().required(),
	storagepath:Joi.string(),
	assetpath:Joi.string()
}


class ImageService extends BaseService{
	constructor(adapter){
		super('images');
	}


    create(data, userId) {
        let self = this;
        let metadata = this._getMetadata(data);
        console.log(metadata);
        let name = this._generateName();
        //completo il modello image
        metadata.name = name;
        metadata.user = userId;
        metadata.storagepath = './asset/' + name;
        metadata.assetpath = './asset/' + name;
        let path=metadata.path;
        delete metadata.path;
        //Validate the parameters
        let err = Joi.validate(metadata, schema);
        console.dir(err ? err : 'Valid!');
        if (err.error) throw new Error(err);
        return co(function*() {
            //trasferisco il file nel suo storage
            let check = yield self._moveToStorage(path, name);
            console.log(metadata);
            //creo il doc nel db
            let image= yield self.adapter.create(self.collection,metadata);
            return image;
        })
    }

	remove(){

	}

    //Private
    _getMetadata(file) {
        let obj = {
            name: file.name,
            originalname: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            extension: file.extension,
            size: file.size,
            path: file.path
        }
        return obj;
    }

    * _moveToStorage(pathFile,name) {
        let targetPath = './asset/'+name;
        console.log(pathFile);
        try {
            return yield fs.rename(pathFile, targetPath);

        } catch (e) {
            return e;
        }

    }

    _generateName() {
        return crypto.createHash('md5').update(uuid.v4()).digest('hex');
    }

}

export let imageService = new ImageService();

'use strict'
import co from 'co'
import Joi from 'joi';
import {BaseService} from './base';
import fs from 'co-fs';

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


	create(data){
        let self=this;
        let metadata=this.getMetadata(data);
        console.log(this.getMetadata(data));
        
        return co(function*(){
            let check=yield self.moveToStorage(metadata.path,metadata.name); 
            console.log(check)


        })

        //completo il modello image

        //trasferisco il file nel suo storage

        //creo il doc nel db



	}

	remove(){

	}

    //Private
    getMetadata(file) {
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

    * moveToStorage(pathFile,name) {
        let targetPath = './asset/'+name;
        console.log(pathFile);
        try {
            return yield fs.rename(pathFile, targetPath);

        } catch (e) {
            return e;
        }

    }

}

export let imageService = new ImageService();

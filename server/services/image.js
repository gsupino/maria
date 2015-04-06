'use strict'
import co from 'co'
import Joi from 'joi';
import {BaseService} from './base';
import fs from 'co-fs';
import crypto from 'crypto';
import uuid from 'uuid';

const appRoot = require('app-root-path').path;

Joi.objectId = require('joi-objectid');

const schema = {
    name: Joi.string().required(),
    originalname: Joi.string(),
    created: Joi.date().default(Date.now,'time of creation'),
    caption: Joi.string(),
    size: Joi.number(),
    encoding: Joi.string(),
    mimetype: Joi.string(),
    extension: Joi.string(),
    user: Joi.objectId().required(),
    storagepath: Joi.string(),
    assetpath: Joi.string()
}


class ImageService extends BaseService {
    constructor(adapter) {
        super('images');
    }


    create(data, userId) {
        let self = this;
        let metadata = this._getMetadata(data);
        let name = this._generateName();
        let targetPath = this._generatePath(name, metadata.extension);
        //completo il modello image
        metadata.name = name;
        metadata.user = userId;
        metadata.storagepath = targetPath;
        metadata.assetpath = targetPath;
        let path = metadata.path;
        delete metadata.path;
        //Validate the parameters
        let err = Joi.validate(metadata, schema);
        //console.dir(err ? err : 'Valid!');
        if (err.error) throw new Error(err);
        return co(function*() {
            try {
                //trasferisco il file nel suo storage
                let check = yield self._moveToStorage(path, targetPath);
                //creo il doc nel db
                let image = yield self.adapter.create(self.collection, metadata);
                return image;

            } catch (e) {
                throw e;
            }
        })
    }

    remove(id) {
        let self = this;

        return co(function*() {
            try {
                //load the image file model
                let image = yield self.adapter.getById(self.collection, id);
                //delete file
                let checkFile = yield self._removeFromStorage(image.storagepath);
                //delete model from db
                let check = yield self.adapter.remove(self.collection, id);
                return;

            } catch (e) {
                throw e;
            }


        })
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

    * _moveToStorage(pathFile, targetPath) {
        try {
            return yield fs.rename(pathFile, targetPath);

        } catch (e) {
            throw e;
        }

    }

    * _removeFromStorage(pathFile) {
        try {
            return yield fs.unlink(pathFile);

        } catch (e) {
            throw e;
        }

    }

    _generatePath(name, ext) {
        return (appRoot + '/asset/' + name + '.' + ext);
    }


    _generateName() {
        return crypto.createHash('md5').update(uuid.v4()).digest('hex');
    }

}

export let imageService = new ImageService();

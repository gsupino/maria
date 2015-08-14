'use strict'
import monk from 'monk';
import wrap from 'co-monk';
import config from '../config/environment';

class AdapterMongo {

    constructor() {
        this.db = monk(config.mongo.uri, config.mongo.options);
    }

    * getQuery(collection, query, options) {
        let q = query || {}
        let opt = options || {}
        let col = wrap(this.db.get(collection))
        try {
            let result = yield(col.find(q, opt));
            return result;
        } catch (e) {
            throw e;
        }
    }

    * getById(collection, id) {
        let col = wrap(this.db.get(collection))
        try {
            let result = yield(col.findById(id));
            return result;
        } catch (e) {
            throw e;
        }
    }

    * getOne(collection, query, options) {
        let q = query || {}
        let opt = options || {}
        let col = wrap(this.db.get(collection));
        try {
            let result = yield(col.findOne(q, opt));
            return result;
        } catch (e) {
            throw e;
        }
    }

    * create(collection, doc) {
        let col = wrap(this.db.get(collection));
        try {
            let result = yield col.insert(doc);
            return result;
        } catch (e) {
            throw e;
        }
    }

    * updateById(collection, id, doc) {
        let col = wrap(this.db.get(collection));
        try {
            let result = yield col.updateById(id,doc);
            return result;
        } catch (e) {
            throw e;
        }
    }

    * remove(collection, id) {
        let col = wrap(this.db.get(collection));
        try {
            let result = yield(col.remove({
                _id: id
            }));
            return result;
        } catch (e) {
            throw e;
        }
    }

    * removeField(collection, id, field) {
        let col = wrap(this.db.get(collection));
        try {
            let result = yield(col.findAndModify({
                _id: id
            }, {
                $unset: {
                    field: 1
                }
            }));
            return result;
        } catch (e) {
            throw e;
        }

    }


    close() {
        this.db.close()
    }
}

export let adapterMongo = new AdapterMongo();

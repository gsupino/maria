'use strict'
import monk from 'monk';
import wrap from 'co-monk';
import config from '../config/environment';

class AdapterMongo {

    constructor() {
        console.log('mongo');
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
            return e;
        }
    }

    * getById(collection, id) {
        let col = wrap(this.db.get(collection))
        try {
            let result = yield(col.findById(id));
            return result;
        } catch (e) {
            return e;
        }
    }

    * getOne(collection, query, options) {
        let q = query || {}
        let opt = options || {}
        let col = wrap(this.db.get(collection))
        try {
            let result = yield(col.findOne(q, opt));
            return result;
        } catch (e) {
            return e;
        }
    }

    * create(collection, doc) {
        let col = wrap(this.db.get(collection))
        try{
          let result=yield col.insert(doc);
          return result;
        }
        catch(e){
          return e;
        }
    }

    close() {
        this.db.close()
    }
}

export let adapterMongo = new AdapterMongo();

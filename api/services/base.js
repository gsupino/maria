'use strict'
import co from 'co'
import {adapterMongo} from '../adapters/adapterMongo';

export class BaseService {
    constructor(collection) {
        this.adapter = adapterMongo;
        this.collection = collection;
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
}

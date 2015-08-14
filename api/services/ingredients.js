'use strict'
import co from 'co'
import {BaseService} from './base';

const appRoot = require('app-root-path').path;



class IngredientService extends BaseService {
    constructor(adapter) {
        super('ingredients');
    }

    find() {
        let self = this;
        return co(function*() {
            try {
                return yield self.adapter.getQuery(self.collection, {}, {
                    limit: 10
                });
            } catch (e) {
                return e;
            }
        })
    }



    create(){

    }

    update(){


    }

    remove(){

    }


    
    getDescription(){
        let self = this;
        return co(function*() {
            try {
                return yield self.adapter.getQuery(self.collection, {}, {
                    fields: ['description']
                });
            } catch (e) {
                return e;
            }
        })

    }
    

}


export let ingredientService = new IngredientService();

'use strict'
import co from 'co'
import {BaseService} from './base';

const appRoot = require('app-root-path').path;



class RecipeService extends BaseService {
    constructor(adapter) {
        super('recipes');
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


    

}


export let recipeService = new RecipeService();

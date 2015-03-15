'use strict'
import co from 'co'
import {adapterMongo} from '../adapters/adapterMongo';


//import {Adapter} from './adapter'
const Joi = require('joi');

let schema = {
  name: Joi.string()
}


class UserService {
  constructor(adapter) {
    this.adapter=adapterMongo;
  }

 list() {
    let self=this
    return co(function*(){
      let result=yield self.adapter.getQuery('users',{})
      return result
    })

  }


}

export let userService=new UserService();
'use strict'
import monk from 'monk';
import wrap from'co-monk';
import config from'../config/environment';

class AdapterMongo {

  constructor(){
    console.log('mongo');
    this.db=monk(config.mongo.uri,config.mongo.options);
  }

  *getQuery(collection,query,options){
    let q=query ||{}
    let opt=options || {}
    let col=wrap(this.db.get(collection))
    let result = yield (col.find(q,opt));
    return result;
  }

  close(){
    this.db.close()
   }
}

export let adapterMongo = new AdapterMongo();



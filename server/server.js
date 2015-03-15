"use strict";
require('babel/register');

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express=require('express');
const config=require('./config/environment')

//Start the Adapter services
require('./adapters/adapterMongo');

//Setup server
let server=express();
require('./config/express')(server);
require('./routes')(server);

//Start server
const port = config.port;
server.listen(port);

console.log('server.js is listening on port ' + port);
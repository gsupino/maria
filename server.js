"use strict";
require('babel/register');

const express=require('express');

let server=express();

let port = process.env.PORT || 8080;
server.listen(port);

console.log('server.js is listening on port ' + port);
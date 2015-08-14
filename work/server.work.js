'use strict';
require('babel/register')({
    experimental: true
});
var fs = require('fs');

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express=require('express');
//Setup server
const server=express();
//expressConfig(server);
server.use('/build', express.static(__dirname + '/build'));
console.log(__dirname + '/build')
server.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

const port=3000;
server.listen(port);

console.log('server.js is listening on port ' + port);
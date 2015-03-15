/* @flow weak */

"use strict";
var express = require('express');
var compression = require('compression');
var cors = require('cors');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var appRoot=require('app-root-path');


module.exports=function(app){
  var env = app.get('env');
  // Gzip all the things
  app.use(compression());

  // Serve a static directory for the webpack-compiled Javascript and CSS. Only in production since the webpack dev server handles this otherwise.
  if (env === "production") {
    app.use('/build', express.static(appRoot + '/build'));
  }

  // Serves up a static directory for images and other assets that we don't (yet) require via Webpack
  app.use('/static', express.static(appRoot + '/static'));

  // Cross-origin resource sharing
  app.use(cors());


  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  //app.use(passport.initialize());

}



'use strict';
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const appRoot=require('app-root-path');


export function expressConfig(app){
  const env = app.get('env');
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
  app.use(expressValidator());
  app.use(cookieParser());
  app.use(passport.initialize());

}



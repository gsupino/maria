'use strict';
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const appRoot = require('app-root-path').path;
const multer = require('multer');

export function expressConfig(app) {
    const env = app.get('env');

    // Gzip all the things
    app.use(compression());

    app.use('/public', express.static(appRoot + '/build'));


    // Cross-origin resource sharing
    app.use(cors());

    app.use(multer({
        dest: appRoot + '/upload'
    }));
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(expressValidator());
    app.use(cookieParser());
    app.use(passport.initialize());

}

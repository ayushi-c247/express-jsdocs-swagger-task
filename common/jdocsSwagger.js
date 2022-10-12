const express = require('express');
const validator = require('./validator');
const app =express()
const options = {
    info: {
        version: '1.0.0',
        title: 'User Management',
        license: {
            name: 'MIT',
        },
    },

    filesPattern: './controller/*.js',
    baseDir: __dirname,
};
const instance = expressJSDocSwagger(app)(options);
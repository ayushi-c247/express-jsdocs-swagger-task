const express = require('express');
const validator =require("../common/validator")
const expressJSDocSwagger = require('express-jsdoc-swagger');
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
const serverApp = async (instance) => {
const { validateRequest, validateResponse } = await validator(instance);
}
module.exports = serverApp
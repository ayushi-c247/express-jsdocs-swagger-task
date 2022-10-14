const express = require('express');
const { UserController } = require("../controller")
const validator = require("../common/validator")
// const serverApp =require("../common/jdocsSwagger")
const { init } = require('express-oas-validator');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const router = express.Router()
const app = express()
const options = {
    info: {
        version: '1.0.0',
        title: 'User Management',
        license: {
            name: 'MIT',
        },
    },
    filesPattern: '../controller/*.js',
    baseDir: __dirname,
};
const instance = expressJSDocSwagger(app)(options);
const serverApp = () => new Promise(resolve => {
    instance.on('finish', data => {
        const { validateRequest, validateResponse } = init(data);
        console.log("validateRequest-------------------------", validateRequest);
        router.get("/", validateRequest(), UserController.getAllUSer)
        router.post("/signup", UserController.createUser)
        router.post("/login", validateRequest(), UserController.login)
        router.put("/:id", UserController.updateUser)
        router.get('/:id', UserController.getUserDetails)
        resolve(app);
    })
})
module.exports = serverApp



// const express = require('express');
// const validator = require("../common/validator")
// const {UserController}= require("../controller")

// const router = express.Router()
// const serverApp = async (instance) => {
//     const { validateRequest, validateResponse } = await validator(instance);
//     console.log("validateRequest-------------------------", validateRequest);
//     router.get("/", UserController.getAllUSer)
//     router.post("/signup", UserController.createUser)
//     router.post("/login",validateRequest(), UserController.login)
//     router.put("/:id", UserController.updateUser)
//     router.get('/:id', UserController.getUserDetails)
//     return router;
// };

// module.exports = serverApp
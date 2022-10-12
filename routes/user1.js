
// const express = require('express');
// const { UserController } = require("../controller")
// const expressJSDocSwagger = require('express-jsdoc-swagger');
// const validator = require("../common/validator")
// const app = express()
// const router = express.Router()
// const options = {
//     info: {
//         version: '1.0.0',
//         title: 'User Management',
//         license: {
//             name: 'MIT',
//         },
//     },
//     filesPattern: '../controller/*.js',
//     baseDir: __dirname,
// };
// const instance = expressJSDocSwagger(app)(options);
// const serverApp = async () => {
//     const { validateRequest, validateResponse } = await validator(instance);
//     console.log("validateRequest-------------------------", validateRequest);
//     router.get("/", validateRequest({ headers: false }), UserController.getAllUSer)
//     router.post("/signup", UserController.createUser)
//     router.post("/login",validateRequest(), UserController.login)
//     router.put("/:id", UserController.updateUser)
//     router.get('/:id', UserController.getUserDetails)
//     return router;
// };
// serverApp()

// module.exports = router

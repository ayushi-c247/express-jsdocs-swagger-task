const express = require('express');
const validator = require("../common/validator")
const {UserController}= require("../controller")

const router = express.Router()
const serverApp = async (instance) => {
    const { validateRequest, validateResponse } = await validator(instance);
    console.log("validateRequest-------------------------", validateRequest);
    router.get("/", UserController.getAllUSer)
    router.post("/signup", UserController.createUser)
    router.post("/login",validateRequest(), UserController.login)
    router.put("/:id", UserController.updateUser)
    router.get('/:id', UserController.getUserDetails)
    return router;
};

module.exports = serverApp
const cors = require('cors')
const express = require('express');
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const validator = require('./common/validator');
const UserModel = require("./model/user")

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

const corsOption = {
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: [
        "x-auth-token",
        "authorization",
    ]
};
app.use(cors(corsOption));


mongoose.connect("mongodb+srv://ayushi:ayushi123@cluster0.z61ir0f.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => {
    console.log("database connected successfully!!");
}).catch((error) => {
    console.log("error", error);
})
const options = {
    info: {
        version: '1.0.0',
        title: 'User Management',
        license: {
            name: 'MIT',
        },
        description: 'API description',
    },
    security: {
        BasicAuth: {
          type: 'http',
          scheme: 'basic',
        },
      },
    filesPattern: './server.js',
    baseDir: __dirname,
};

const instance = expressJSDocSwagger(app)(options);
const serverApp = async () => {
    const { validateRequest, validateResponse } = await validator(instance);
    /**
 * A User
 * @typedef {object} User
 * @property {string} firstName.required - The firstName of user
 * @property {string} lastName.required - The lastName of user
 * @property {string} email.required - The email of user
 * @property {string} password.required - The password of user
 */

/**
 * POST /api/v1/signup
 * @summary Create User
 * @tags User Information
 * @param {User} request.body.required - User info
 * @return {object} 200 - Success response
 * @return {object} 400 - Bad request response
  * @example request - example payload
 * {
 *   "firstName": "zcgfdg",
 *   "lastName": "xcvfcvf",
 *   "email": "fgfdg@gmail.com",
 *   "password": "xyz@123"
 * }
 * @example response - 200 - example success response
 * {
 *   "message": "User created successfully!!"
 * }
 * @example response - 400 - example error response
 * {
 *   "message": "Failed to save",
 *   "errCode": "EV121"
 * }
 */

app.post("/api/v1/signup", async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Email already exist",
            });
        }
        const createdUser = await UserModel.create({
            firstName,
            lastName,
            email,
            password
        });
        console.log("createdUser", createdUser);
        return res.status(200).json({ message: "user created successfully!!", data: createdUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message ? error.message : message.ERROR_MESSAGE,
        });
    }
})

/**
 * POST /api/v1/login
 * @summary User Login
 * @tags User Information
 * @param {User} request.body.required - User info
 * @return {object} 200 - Success response
 * @return {object} 400 - Bad request response
  * @example request - example payload
 * {
 *   "email": "fgfdg@gmail.com",
 *   "password": "xyz@123"
 * }
 * @example response - 200 - example success response
 * {
 *   "message": "login successfully!!"
 * }
 * @example response - 400 - example error response
 * {
 *   "message": "Failed to login",
 *   "errCode": "400"
 * }
 */

app.post("/api/v1/login", async (req, res) => {
    try {
        console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
        const { email, password } = req.body;
        const user = await UserModel.findOne({
            email,
        });
        if (!user) {
            return res.status(404).json({
                message: "Email does not exist",
            });
        }
        if (password != user.password) {
            return res.status(404).json({
                message: "Password does not match!!",
            });
        }
        const access = {
            id: user._id,
        };
        const token = jwt.sign(access, "bjhjdjjjjjnkjnk", {
            expiresIn: 86400 // expires in 24 hours
        });
        return res.status(200).json({ message: "login successfully!!", token: token });

    } catch (error) {
        console.log("error---------------------",error);
        return res.status(500).json({
            message: error.message,
        });
    }
})


/**
 * GET /api/v1
 * @tags User Information
 * @summary Get Users
 * @return {object} 200 - Get Users
 * @example response - 200 - example success response
 * {
 *   "message": "Get All Users"
 * }
 */

app.get("/api/v1", async (req, res) => {
    try {
        const user = await UserModel.find();
        return res.status(200).json({ message: "Get All Users successfully", data: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
        });
    }
})

/**
 * GET /api/v1/{id}
 * @tags User Information
 * @summary Get User Details
 * @param {string} id.path -  Get _id of user from database
 * @return {object} 200 - Get Users
 * @example response - 200 - example success response
 * {
 *   "message": "User detail get successfully!!"
 * }
 */

app.get('/api/v1/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserModel.findById({ _id: id });
        return res.status(200).json({ message: "Get User details", data: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
        });
    }
})


/**
 * PUT /api/v1/{id}
 * @summary Update User
 * @tags User Information
 * @param {string} id.path - Get _id of user from database
 * @param {User} request.body.required - User info
 * @return {object} 200 - Success response
 * @return {object} 400 - Bad request response
  * @example request - example payload
 * {
 *   "firstName": "zcgfdg",
 *   "lastName": "xcvfcvf",
 *   "email": "fgfdg@gmail.com",
 *   "password": "xyz@123"
 * }
 * @example response - 200 - example success response
 * {
 *   "message": "User updated successfully!!"
 * }
 * @example response - 400 - example error response
 * {
 *   "message": "Failed to save",
 *   "errCode": "EV121"
 * }
 */


app.put("/api/v1/:id", async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserModel.findById({ _id: id });
        if (user) {
            await UserModel.updateOne({ _id: id }, { $set: req.body });
            return res.status(200).json({ message: "User updated successfully!!" });
        }
        return res.status(400).json({ message: "User does not exist!!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
        });
    }
})

return app;
}
const port = 3000;
serverApp()
  .then(app => 
    app.listen(port, () =>
      console.log(`Listening PORT: ${port}`)
    ))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });



// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
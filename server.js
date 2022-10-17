const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const expressJSDocSwagger = require("express-jsdoc-swagger");
const router = require("./routes");
const validators = require("./common/validator");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token", "authorization"],
};
app.use(cors(corsOption));

mongoose
  .connect(
    "mongodb+srv://ayushi:ayushi123@cluster0.z61ir0f.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("database connected successfully!!");
  })
  .catch((error) => {
    console.log("error", error);
  });
const options = {
  info: {
    version: "1.0.0",
    title: "User Management",
    license: {
      name: "MIT",
    },
    description: "API description",
  },
  security: {
    BasicAuth: {
      type: "http",
      scheme: "basic",
    },
  },
  filesPattern: "./controller/*.js",
  baseDir: __dirname,
};
const instance = expressJSDocSwagger(app)(options);
validators(instance).then(({ validateRequest }) => {
  app.use(
    "/api/v1",
    validateRequest({
      header: false,
    }),
    router
  );
  const port = 4000;

  app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
  );
});

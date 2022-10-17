const UserRouter = require("./user");
const express = require("express");

const router = express.Router();

router.use("/", UserRouter);

module.exports = router;

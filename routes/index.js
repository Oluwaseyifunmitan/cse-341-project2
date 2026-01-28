const routes = require("express").Router();


routes.use("/", require("./swagger"));


routes.use("/employees", require("./employees"));

module.exports = routes;

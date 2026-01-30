const routes = require("express").Router();


routes.use("/", require("./swagger"));


routes.use("/employees", require("./employees"));
routes.use("/inventory", require("./inventory"));

module.exports = routes;

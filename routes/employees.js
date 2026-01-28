const express = require("express");
const routes = require("express").Router();

const employeesController = require("../controllers/employee");

routes.get("/", employeesController.getAll);

routes.get("/:id", employeesController.getSingle);

routes.post("/", employeesController.createEmployee);

routes.put("/:id", employeesController.updateEmployee);

routes.delete("/:id", employeesController.deleteEmployee);

module.exports = routes;

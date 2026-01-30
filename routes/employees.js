const express = require("express");
const routes = require("express").Router();

const employeesController = require("../controllers/employee");
const validation = require('../middleware/validate');

routes.get("/", employeesController.getAll);

routes.get("/:id", employeesController.getSingle);

routes.post("/", validation.saveEmployee,employeesController.createEmployee);

routes.put("/:id", validation.saveEmployee,employeesController.updateEmployee);

routes.delete("/:id", employeesController.deleteEmployee);

module.exports = routes;

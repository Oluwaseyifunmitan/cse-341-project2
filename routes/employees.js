const express = require("express");
const routes = require("express").Router();

const employeesController = require("../controllers/employee");
const validation = require("../middleware/validate");
const auth = require("../middleware/authenticate");

routes.get("/", async (req, res, next) => {
  try {
    await employeesController.getAll(req, res);
  } catch (error) {
    next(error);
  }
});

routes.get("/:id", async (req, res, next) => {
  try {
    await employeesController.getSingle(req, res);
  } catch (error) {
    next(error);
  }
});

routes.post(
  "/",
  auth.isAuthenticated,
  validation.saveEmployee,
  async (req, res, next) => {
    try {
      await employeesController.createEmployee(req, res);
    } catch (error) {
      next(error);
    }
  },
);

routes.put(
  "/:id",
  auth.isAuthenticated,
  validation.saveEmployee,
  async (req, res, next) => {
    try {
      await employeesController.updateEmployee(req, res);
    } catch (error) {
      next(error);
    }
  },
);

routes.delete("/:id", auth.isAuthenticated, async (req, res, next) => {
  try {
    await employeesController.deleteEmployee(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = routes;

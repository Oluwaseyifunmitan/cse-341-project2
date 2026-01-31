const express = require("express");
const routes = require("express").Router();

const employeesController = require("../controllers/employee");
const validation = require('../middleware/validate');

routes.get('/', async (req, res, next) => {
  try {
    await employeesController.getAll(req, res);
  } catch (error) {
    next(error);
  }
});

// GET single employee
routes.get('/:id', async (req, res, next) => {
  try {
    await employeesController.getSingle(req, res);
  } catch (error) {
    next(error);
  }
});

// CREATE employee
routes.post(
  '/',
  validation.saveEmployee,
  async (req, res, next) => {
    try {
      await employeesController.createEmployee(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// UPDATE employee
routes.put(
  '/:id',
  validation.saveEmployee,
  async (req, res, next) => {
    try {
      await employeesController.updateEmployee(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE employee
routes.delete('/:id', async (req, res, next) => {
  try {
    await employeesController.deleteEmployee(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = routes;

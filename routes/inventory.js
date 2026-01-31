const express = require("express");
const routes = require("express").Router();

const inventoryController = require("../controllers/inventory");
const validation = require('../middleware/validate');


routes.get('/', async (req, res, next) => {
  try {
    await inventoryController.getAll(req, res);
  } catch (error) {
    next(error);
  }
});

// GET single inventory
routes.get('/:id', async (req, res, next) => {
  try {
    await inventoryController.getSingle(req, res);
  } catch (error) {
    next(error);
  }
});

// CREATE inventory
routes.post(
  '/',
  validation.saveInventory,
  async (req, res, next) => {
    try {
      await inventoryController.createInventory(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// UPDATE inventory
routes.put(
  '/:id',
  validation.saveInventory,
  async (req, res, next) => {
    try {
      await inventoryController.updateInventory(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE inventory
routes.delete('/:id', async (req, res, next) => {
  try {
    await inventoryController.deleteInventory(req, res);
  } catch (error) {
    next(error);
  }
});


module.exports = routes;

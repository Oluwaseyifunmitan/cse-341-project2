const express = require("express");
const routes = require("express").Router();

const inventoryController = require("../controllers/inventory");
const validation = require('../middleware/validate');
const auth =require('../middleware/authenticate');


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
  auth.isAuthenticated,validation.saveInventory,
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
 auth.isAuthenticated, validation.saveInventory,
  async (req, res, next) => {
    try {
      await inventoryController.updateInventory(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE inventory
routes.delete('/:id',auth.isAuthenticated, async (req, res, next) => {
  try {
    await inventoryController.deleteInventory(req, res);
  } catch (error) {
    next(error);
  }
});


module.exports = routes;

const express = require("express");
const routes = require("express").Router();

const inventoryController = require("../controllers/inventory");
const validation = require('../middleware/validate');
const asyncHandler = require('../helpers/asyncHandler');

routes.get("/", asyncHandler(inventoryController.getAll));

routes.get("/:id", asyncHandler(inventoryController.getSingle));

routes.post(
  "/",
  validation.saveInventory,
  asyncHandler(inventoryController.createInventory)
);

routes.put(
  "/:id",
  validation.saveInventory,
  asyncHandler(inventoryController.updateInventory)
);

routes.delete(
  "/:id",
  asyncHandler(inventoryController.deleteInventory)
);


module.exports = routes;

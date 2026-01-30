const express = require("express");
const routes = require("express").Router();

const inventoryController = require("../controllers/inventory");
const validation = require('../middleware/validate');

routes.get("/", inventoryController.getAll);

routes.get("/:id", inventoryController.getSingle);

routes.post("/", validation.saveInventory,inventoryController.createInventory);

routes.put("/:id", validation.saveInventory,inventoryController.updateInventory);

routes.delete("/:id", inventoryController.deleteInventory);

module.exports = routes;

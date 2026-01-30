const express = require("express");
const routes = require("express").Router();

const inventoryController = require("../controllers/inventory");

routes.get("/", inventoryController.getAll);

routes.get("/:id", inventoryController.getSingle);

routes.post("/", inventoryController.createInventory);

routes.put("/:id", inventoryController.updateInventory);

routes.delete("/:id", inventoryController.deleteInventory);

module.exports = routes;

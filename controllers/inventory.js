const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("inventory")
    .find();
  result.toArray().then((inventory) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(inventory);
  });
};

const getSingle = async (req, res) => {
  const inventoryId = new ObjectId(req.params.id);

  const result = await mongodb
    .getDatabase()
    .db()
    .collection("inventory")
    .find({ _id: inventoryId });
  result.toArray().then((inventory) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(inventory);
  });
};

const createInventory = async (req, res) => {
  const inventory = {
    producttName: req.body.productName,
    category: req.body.category,
    price: req.body.price,
    quantity: req.body.quantity,
    supplier: req.body.supplier,
    reorderLevel: req.body.reorderLevel,
    dateAdded: req.body.dateAdded,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("inventory")
    .insertOne(inventory);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the contact.",
      );
  }
};

const updateInventory = async (req, res) => {
  const inventoryId = new ObjectId(req.params.id);

  const inventory = {
    producttName: req.body.productName,
    category: req.body.category,
    price: req.body.price,
    quantity: req.body.quantity,
    supplier: req.body.supplier,
    reorderLevel: req.body.reorderLevel,
    dateAdded: req.body.dateAdded,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("inventory")
    .replaceOne({ _id: inventoryId }, inventory);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the contact.",
      );
  }
};

const deleteInventory = async (req, res) => {
  try {
    const inventoryId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("inventory")
      .deleteOne({ _id: inventoryId });

    if (response.deletedCount === 1) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAll,
  getSingle,
  createInventory,
  updateInventory,
  deleteInventory,
};

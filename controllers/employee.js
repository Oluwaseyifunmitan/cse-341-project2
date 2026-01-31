const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("employees")
    .find();
  result.toArray().then((employees) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(employees);
  });
};

const getSingle = async (req, res) => {
  const employeeId  = new ObjectId(req.params.id);

  const result = await mongodb
    .getDatabase()
    .db()
    .collection("employees")
    .find({ _id: employeeId });
  result.toArray().then((employees) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(employees);
  });
};

const createEmployee = async (req, res) => {
  const employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    jobTitle: req.body.jobTitle,
    department: req.body.department,
    email: req.body.email,
    phone: req.body.phone,
    hireDate: req.body.hireDate,
    salary: req.body.salary,
    status: req.body.status,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("employees")
    .insertOne(employee);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the employee",
      );
  }
};

const updateEmployee = async (req, res) => {
  const employeeId = new ObjectId(req.params.id);

  const employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    jobTitle: req.body.jobTitle,
    department: req.body.department,
    email: req.body.email,
    phone: req.body.phone,
    hireDate: req.body.hireDate,
    salary: req.body.salary,
    status: req.body.status,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("employees")
    .replaceOne({ _id: employeeId }, employee);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the employee",
      );
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employeeId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("employees")
      .deleteOne({ _id: employeeId });

    if (response.deletedCount === 1) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAll,
  getSingle,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};

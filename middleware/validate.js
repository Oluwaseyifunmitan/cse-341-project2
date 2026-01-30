const validator = require('../helpers/validate');

const saveEmployee = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName:'required|string',
    jobTitle: 'required|string',
    department: 'required|string',
    email:'required|email',
    phone: 'required|string',
    hireDate:'required|string',
    salary: 'integer',
    status:  'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};
const saveInventory = (req, res, next) => {
  const validationRule = {
    productName: 'required|string',
    category: 'required|string',
    price: 'required|integer',
    quantity: 'required|integer',
    supplier: 'required|string',
    reorderLevel: 'integer',
    dateAdded: 'required|string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }
    next();
  });
};
module.exports = {
  saveEmployee,
  saveInventory
};
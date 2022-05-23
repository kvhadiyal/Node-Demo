const {
  body
} = require('express-validator');
const validator = require('../../../helper/validator');
const userValidator = {};

userValidator.validateUser = () => {
  return [
    body('firstName', validator.customMessage("isRequired", "First name")).custom(value =>
      validator.checkExists(value)
    ),
    body('firstName', validator.customMessage("isString", "Fser name")).isString(),

    body('lastName', validator.customMessage("isRequired", "Last name")).custom(value =>
      validator.checkExists(value)
    ),
    body('lastName', validator.customMessage("isString", "Last name")).isString(),

    body('email', validator.customMessage("isRequired", "Email")).custom(value =>
      validator.checkExists(value)
    ),
    body('email', validator.customMessage("isString", "Email")).isString(),

    body('password', validator.customMessage("isRequired", "Password")).custom(value =>
      validator.checkExists(value)
    ),
    body('password', validator.customMessage("isString", "Password")).isString(),
  ];
};


userValidator.validateLoginUser = () => {
  return [
    body('email', validator.customMessage("isRequired", "Email")).custom(value =>
      validator.checkExists(value)
    ),
    body('email', validator.customMessage("isString", "Email")).isString(),

    body('password', validator.customMessage("isRequired", "Password")).custom(value =>
      validator.checkExists(value)
    ),
    body('password', validator.customMessage("isString", "Password")).isString(),
  ];
};

module.exports = userValidator;

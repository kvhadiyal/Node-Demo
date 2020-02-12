const {
  body, check
} = require('express-validator/check');
const validator = require('../../../helper/validator');
const {
  SIGNUPTYPE,
  ROLE
} = require('../../../constants/model');
const userValidator = {};
// validate update user detail

userValidator.validateEmail = (field) => {
  return check(field).isEmail();
};

userValidator.validateEmpty = (field) => {
  return check(field).isString();
};

userValidator.verifyEnum = (field, options) => {
  return check(field).isIn(options);
}

userValidator.validateCreateAccount = () => {
  return [
    body('fullName', validator.customMessage("isRequired", "full name")).custom(value =>
      validator.checkExists(value)
    ),
    body('fullName', validator.customMessage("isString", "full name")).isString(),
    body('fullName', validator.customMessage("isMin", "full name", 2)).isLength({ min: 2 }),
    body('fullName', validator.customMessage("isMax", "full name", 30)).isLength({ max: 30 }),

    body('email', validator.customMessage("isRequired", "email")).custom(value =>
      validator.checkExists(value)
    ),
    body('email', validator.customMessage("isString", "email")).isString(),
    body('email').isEmail(),


    body('password', validator.customMessage("isRequired", "password")).custom(value =>
      validator.checkExists(value)
    ),
    body('password', validator.customMessage("isString", "password")).isString(),


    body('mobileNo', validator.customMessage("isRequired", "mobile number")).custom(value =>
      validator.checkExists(value)
    ),


    body('deviceId', validator.customMessage("isRequired", "deviceId")).custom(value =>
      validator.checkExists(value)
    ),
    body('deviceId', validator.customMessage("isString", "deviceId")).isString(),

    body('role', validator.customMessage("isRequired", "role")).custom(value =>
      validator.checkExists(value)
    ),
    body('role', validator.customMessage("isIn", "role")).isIn(_.values(ROLE)),
    body('role', validator.customMessage("isString", "role")).isString(),
  ]
}

module.exports = userValidator;

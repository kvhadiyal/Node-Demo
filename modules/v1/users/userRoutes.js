// Dependencies
const {
  _,
} = global;
const express = require('express');
const {
  validationResult,
} = require('express-validator/check');

const {
  PAGE422,
} = require('../../../constants/common');
const auth = require('../../../helper/auth');
const userController = require('./userController');
const userValidator = require('./userValidator');
const userMiddleware = require('./userMiddleware');
const userRoute = express.Router();

// login
const loginMiddleware = [
  userValidator.validateEmpty('emailOrMobile'),
  userValidator.validateEmpty('password'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(PAGE422.CODE).json({
        errors: errors.array()[0]
      });
    }
    return next();
  },
  userController.login,
];
userRoute.post('/login', loginMiddleware);

// create account
const createAccountMiddleware = [
  userValidator.validateCreateAccount(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(PAGE422.CODE).json({
        errors: errors.array()[0]
      });
    }
    return next();
  },
  userMiddleware.emailExists,
  userMiddleware.mobileExists,
  userController.createAccount,
];
userRoute.post('/create-account', createAccountMiddleware);

module.exports = userRoute;

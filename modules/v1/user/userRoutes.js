const express = require('express');
const userController = require('./userController');
const userValidator = require('./userValidator');
const userMiddleware = require('./userMiddleware');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const {
  validationResult,
} = require('express-validator');
const {
  PAGE422
} = require('../../../constants/common');
const auth = require('../../../helper/auth');
const userRoute = express.Router();

// create user
const createUserMiddleware = [
  multipartMiddleware,
  userValidator.validateUser(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(PAGE422.CODE).json({
        errors: errors.array()[0]
      });
    }
    return next();
  },
  userController.createUser,
];
userRoute.post('/create', createUserMiddleware);

const loginMiddleware = [
  userValidator.validateLoginUser(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(PAGE422.CODE).json({
        errors: errors.array()[0]
      });
    }
    return next();
  },
  userMiddleware.emailDoesNotExists,
  userController.login,
];
userRoute.post('/login', loginMiddleware);

// get users
const getUsersMiddleware = [
  auth.isAuthenticatedUser,
  userController.getUsers,
];
userRoute.get('/users', getUsersMiddleware);


module.exports = userRoute;

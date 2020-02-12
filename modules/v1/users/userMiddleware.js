// load helper and modules
const utils = require('../../../helper/utils');
const { ERROR400 } = require('../../../constants/common');
const userService = require('./userService');
const userMiddleware = {};

// check email is exists or not
userMiddleware.emailExists = async (req, res, next) => {
  if (!utils.empty(req.body.email)) {
    let userId = null;
    if (!utils.empty(req.authUser)) {
      userId = req.authUser.id;
    }
    if (req.body.userId) {
      userId = req.body.userId;
    }
    const {
      email,
    } = req.body;
    const user = await userService.getUserByEmailOrPhone(email, userId);
    if (!utils.empty(user)) {
      return res.status(ERROR400).json({
        msg: req.t('USER_EMAIL_EXISTS'),
        status: false
      });
    }
    next();
  } else {
    next();
  }
};

// check mobile is exists or not
userMiddleware.mobileExists = async (req, res, next) => {
  if (!utils.empty(req.body.mobileNo)) {
    let userId = null;
    if (!utils.empty(req.authUser)) {
      userId = req.authUser.id;
    }
    if (req.body.userId) {
      userId = req.body.userId;
    }
    const {
      mobileNo,
    } = req.body;
    const user = await userService.getUserByEmailOrPhone(mobileNo, userId);
    if (!utils.empty(user)) {
      return res.status(ERROR400)
        .json({
          msg: req.t('USER_MOBILE_EXISTS'),
          status: false
        });
    }
    next();
  } else {
    next();
  }
};

// Check email is does't exists
userMiddleware.emailDoesNotExists = async (req, res, next) => {
  let {
    email,
  } = req.body;
  if (!email) {
    email = req.body.user.email
  }
  const user = await userService.getUserByEmail(email);
  if (utils.empty(user)) {
    return res.status(ERROR400)
      .json({
        errors: { msg: req.t("USER_DOESN'T EXISTS") },
        status: false,
      });
  } else {
    req.requestedUser = user;
    next();
  }
};

// check exists user only
userMiddleware.existsUser = (req, res, next) => {
  userModel.getUserById(req.body.userId, false, false, (user) => {
    if (utils.empty(user)) {
      return res.status(ERROR400)
        .json({
          msg: req.t('USER_ID_NOT_VALID'),
          status: false
        });
    }
    next();
  });
};

module.exports = userMiddleware;

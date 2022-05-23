const {
    jwt,
} = global;
const utils = require('./utils');
const {
    Types,
} = require('mongoose');
const {
    UNAUTHORISED,
} = require('../constants/common');
const userService = require('../modules/v1/user/userService');
const auth = {};

auth.isAuthenticatedUser = async (req, res, next) => {
    console.log('auth');
    let token = (req.headers && req.headers['x-auth-token']);
    if (utils.empty(token)) {
        token = (req.body && req.body['x-auth-token']);
    }
    const userData = jwt.verify(token);
    if (utils.empty(userData.userId)) {
        return res.status(UNAUTHORISED.CODE).json({
            errors: { msg: req.t(UNAUTHORISED.MESSAGE) },
            status: false
        });
    }
    const where = {
        _id: Types.ObjectId(userData.userId),
    };
    userService.getUser(where).then((user) => {
        if (!user) {
            return res.status(UNAUTHORISED.CODE).json({
                errors: { msg: req.t(UNAUTHORISED.MESSAGE) },
                status: false
            });
        }
        if (user) {
            req.authUser = user;
            return next();
        }
        return res.status(UNAUTHORISED.CODE).json({
            errors: { msg: req.t(UNAUTHORISED.MESSAGE) },
            status: false
        });
    });
};

module.exports = auth;

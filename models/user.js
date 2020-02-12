const {
  _,
} = global;
const constants = require('../constants/model');
const utils = require('../helper/utils');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: Schema.Types.String,
  },
  email: {
    type: Schema.Types.String,
  },
  password: {
    type: Schema.Types.String,
    set: function set(password) {
      let newPassword = '';
      if (!utils.empty(password)) {
        newPassword = utils.hash(password);
      }
      return newPassword;
    },
  },
  mobileNo: {
    type: Schema.Types.String,
  },
  role: {
    type: Schema.Types.String,
    enum: _.values(constants.role),
    default: constants.ROLE.USER,
  },
  deviceId: {
    type: Schema.Types.String,
  },
  device: {
    type: Schema.Types.String,
    enum: _.values(constants.DEVICE),
    default: constants.DEVICE.IOS,
  },
  resetPasswordToken: Schema.Types.String,
  resetPasswordExpiresIn: Schema.Types.String,
  signupType: {
    type: Schema.Types.String,
    enum: _.values(constants.SIGNUPTYPE),
    default: constants.SIGNUPTYPE.NORMAL,
  },
  status: {
    type: Schema.Types.String,
    enum: _.values(constants.STATUS),
    default: constants.STATUS.ACTIVE,
  },
}, {
  timestamps: true,
  getters: true,
  versionKey: false
});

userSchema.methods.authenticate = function (password) {
  return utils.compare(password, this.password);
};

module.exports = mongoose.model('users', userSchema);

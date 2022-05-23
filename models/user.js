const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: Schema.Types.String,
  },
  lastName: {
    type: Schema.Types.String,
  },
  email: {
    type: Schema.Types.String,
  },
  password: {
    type: Schema.Types.String,
    set: function set(password) {
      let newPassword = '';
      if (password) {
        newPassword = utils.hash(password);
      }
      return newPassword;
    },
  },
  profile: {
    type: Schema.Types.String,
  }
}, {
  timestamps: true,
  getters: true,
  versionKey: false
});
module.exports = mongoose.model('users', userSchema);

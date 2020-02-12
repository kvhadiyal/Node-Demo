const {
  models: {
    users: usersModel,
  },
} = global;
const userService = {};

// insert record
userService.createAccount = (data) => {
  return usersModel.create(data);
};

// find one user details
userService.getUser = (where) => {
  return usersModel.findOne(where);
};

// find one user by email
userService.getUserByEmail = (email) => {
  return usersModel.findOne({ email })
};

// find one user by email or phone
userService.getUserByEmailOrPhone = (email, userId) => {
  const where = {
    $or: [{
      email,
    }, {
      mobileNo: email,
    }],
  };
  if (userId) {
    where._id = {
      $ne: userId,
    };
  }
  return userService.getUser(where);
};

// upadte user
userService.updateUser = (query, data) => {
  return usersModel.findOneAndUpdate(query, data)
};

module.exports = userService;

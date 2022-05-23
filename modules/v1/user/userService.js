const {
  models: {
    users: usersModel,
  },
} = global;
const userService = {};

/* insert record */
userService.createUser = (data) => {
  return usersModel.create(data);
};

/* get all users */
userService.getUsers = (where) => {
  return usersModel.find(where, { updatedAt: 0 });
};

userService.findOneUserByEmail = (email) => {
  let query = {
    email: email,
  };
  return usersModel.findOne(query);
};

userService.getUser = (where) => {
  return usersModel.findOne(where);
};

userService.authenticate = (otp, hasOtp) => {
  return utils.compare(otp, hasOtp);
};


module.exports = userService;

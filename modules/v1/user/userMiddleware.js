// load helper and modules
const { ERROR400 } = require('../../../constants/common');
const userService = require('./userService');
const userMiddleware = {};

// Check email does't exists
userMiddleware.emailDoesNotExists = async (req, res, next) => {
	let { email } = req.body;
	let user;
	user = await userService.findOneUserByEmail(email);
	if (utils.empty(user)) {
		return res.status(ERROR400).json({
			errors: { msg: req.t("USER_DOESN'T EXISTS") },
			status: false,
		});
	} else {
		req.user = user;
		next();
	}
};

module.exports = userMiddleware;

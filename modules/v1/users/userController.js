const {
	jwt,
} = global;
// load helper and modules
const utils = require('../../../helper/utils');
// load constants
const {
	SERVERERROR,
	UNAUTHORISED,
	SUCCESSCODE,
} = require('../../../constants/common');
// load services
const userService = require('./userService');
const userController = {};

// login
userController.login = async (req, res) => {
	try {
		const {
			emailOrMobile,
			password,
		} = req.body;
		const user = await userService.getUserByEmailOrPhone(emailOrMobile, null);
		if (
			!utils.empty(user)
			&& user.authenticate(password)
		) {

			const userData = user.toJSON();
			delete userData.password;
			userData.secretToken = jwt.createSecretToken({
				userId: userData._id,
			});
			return res.status(SUCCESSCODE.STANDARD)
				.json({
					data: userData,
					msg: req.t('SUCCESS'),
					status: true,
				});
		}
		return res.status(UNAUTHORISED.CODE)
			.json({
				errors: { msg: req.t('EMAIL_PASSWORD_MISMATCH') },
				status: false,
			});
	} catch (error) {
		console.log("userController/login", error)
		return res.status(SERVERERROR.CODE).json({
			errors: { msg: req.t(SERVERERROR.MESSAGE) },
			status: false,
		});
	}
};

// create account
userController.createAccount = async (req, res) => {
	console.log("create account");
	try {
		// create user.
		const userData = req.body;
		const user = await userService.createAccount(userData);
		if (!utils.empty(user)) {
			const userData = user.toJSON();
			delete userData.password;
			userData.secretToken = jwt.createSecretToken({
				userId: userData._id,
			});
			return res.status(SUCCESSCODE.CREATED)
				.json({
					msg: req.t('REGISTRATION_SUCCESS'),
					status: true,
				});
		}
	} catch (error) {
		console.log("userController/createAccount", error)
		return res.status(SERVERERROR.CODE).json({
			errors: { msg: req.t(SERVERERROR.MESSAGE) },
			status: false,
		});
	}
}

module.exports = userController;

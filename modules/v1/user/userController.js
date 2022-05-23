// load constants
const {
	SERVERERROR,
	SUCCESSCODE,
	UNAUTHORISED
} = require('../../../constants/common');
const awsUtils = require('../../../helper/awsUtils');
// load services
const userService = require('./userService');
const userController = {};

/* login */
userController.login = async (req, res) => {
	logger.log({
		level: 'info',
		message: 'login',
	});
	try {
		const {
			body: { password },
			user,
		} = req;
		let responseData = {};
		if (!utils.empty(user) && password && (userService.authenticate(password, user.password))) {
			responseData = await userController.doLogin(user, req, res);
			return res.status(SUCCESSCODE.STANDARD).json({
				msg: req.t('SUCCESS'),
				data: responseData,
				status: true,
			});
		}
		return res.status(UNAUTHORISED.CODE).json({
			errors: { msg: req.t('EMAIL_PASSWORD_MISMATCH') },
			status: false,
		});
	} catch (error) {
		logger.log({
			level: 'error',
			message: 'Error at login ' + error,
		});
		return res.status(SERVERERROR.CODE).json({
			errors: { msg: req.t(SERVERERROR.MESSAGE) },
			status: false,
		});
	}
};

/* doLogin called from login */
userController.doLogin = async (user) => {
	logger.log({
		level: 'info',
		message: 'doLogin',
	});
	try {
		let responseData = {};
		user = user.toJSON();
		delete user.password;
		user.secretToken = jwt.createSecretToken({
			userId: user._id,
		});
		responseData = user;
		return responseData;
	} catch (error) {
		logger.log({
			level: 'error',
			message: 'Error at doLogin ' + error,
		});
		throw error;
	}
};


/* create user */
userController.createUser = async (req, res) => {
	logger.log({
		level: 'info',
		message: 'userController/createUser'
	});
	try {
		let {
			body: { firstName,
				lastName,
				email,
				password },
			files: {
				fileData: fileData,
				fileData: {
					originalFilename
				}
			},
		} = req;
		// create user
		let uploaded;
		if (fileData) {
			uploaded = await awsUtils.uploadFile(fileData, originalFilename);
		}
		const user = await userService.createUser({ firstName, lastName, email, password, profile: uploaded ? uploaded.key : null });
		if (user) {
			return res.status(SUCCESSCODE.CREATED)
				.json({
					msg: req.t('REGISTRATION_SUCCESS'),
					status: true,
				});
		}
	} catch (error) {
		logger.log({
			level: 'error',
			message: `Error at userController/createUser ${error}`
		});
		return res.status(SERVERERROR.CODE).json({
			errors: { msg: req.t(SERVERERROR.MESSAGE) },
			status: false,
		});
	}
};


/* get users */
userController.getUsers = async (req, res) => {
	logger.log({
		level: 'info',
		message: 'userController/getUsers'
	});
	try {
		let { authUser } = req;
		// get users
		const users = await userService.getUsers({
			_id: {
				$nin: [authUser._id]
			}
		});
		return res.status(SUCCESSCODE.STANDARD)
			.json({
				data: users,
				msg: req.t('SUCCESS'),
				status: true,
			});
	} catch (error) {
		logger.log({
			level: 'error',
			message: `Error at userController/getUsers ${error}`
		});
		return res.status(SERVERERROR.CODE).json({
			errors: { msg: req.t(SERVERERROR.MESSAGE) },
			status: false,
		});
	}
};

module.exports = userController;

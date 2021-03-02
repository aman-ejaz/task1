const { sendFailureResponse, response } = require("../utils/utils");

const { signIn } = require('../services/authentication-service');

const login = async (req, res) => {
	try {
		let responseData = await signIn({ email: req.body.email, password: req.body.password });
		response({
			res,
			message: responseData.message,
			statusCode: responseData.statusCode,
			name: responseData.name,
			value: responseData.value,
			count: responseData.count,
			errors: []
		});
	} catch (error) {
		sendFailureResponse({
			res,
			message: error.message,
			statusCode: 500
		});
	}
};

module.exports =
	{ login }


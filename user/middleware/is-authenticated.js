const jwt = require('jsonwebtoken');
const { sendFailureResponse } = require('../utils/utils');

const isAuthenticated = (req, res, next) => {
	try {
		const token = req.headers.authorization || req.headers.Authorization;
		const decoded = jwt.verify(token, process.env.JWTSECRET);
		req.userData = decoded;
		next();
	} catch (error) {
		sendFailureResponse({
			res,
			message: 'Authentication failed',
			statusCode: 401,
		});
	}
};

module.exports = {
	isAuthenticated
}
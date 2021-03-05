const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const { SECRET_TOKEN } = process.env;

module.exports = (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		req.isAuth = false;
		return next();
	}
	const token = authHeader.split(' ')[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, SECRET_TOKEN);
	} catch (err) {
		req.isAuth = false;
		return next();
	}
	if (!decodedToken) {
		req.isAuth = false;
		return next();
	}
	req.userId = decodedToken.userId;
	req.isAuth = true;
	next();
};

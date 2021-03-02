const errorCodes = require('./error-codes');
const { roles, regexList } = require('./constants');

const validateUserData = ({ userData, isUpdate = false }) => {
	let errors = [];
	const { firstName, lastName, password, email } = userData;

	if (!firstName) {
		errors.push(errorCodes.firstNameRequired);
	} else if (firstName && firstName.length > 100) {
		errors.push(errorCodes.invalidFirstName)
	}

	if (!lastName) {
		errors.push(errorCodes.lastNameRequired);
	} else if (lastName && lastName.length > 100) {
		errors.push(errorCodes.invalidLastName)
	}

	if (!email && isUpdate == false) {
		errors.push(errorCodes.emailRequired)
	} else if (email && isUpdate == false && regexList.EMAIL.test(email) == false) {
		errors.push(errorCodes.invalidEmail)
	}
	if (!password && isUpdate == false) {
		errors.push(errorCodes.passwordRequired)
	} else if (password && isUpdate == false && regexList.PASSWORD.test(password) == false) {
		errors.push(errorCodes.invalidPassword)
	}

	return errors.length > 0 ? errors : false;
}

module.exports = { validateUserData }
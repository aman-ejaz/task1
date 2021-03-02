const roles = {
	ADMIN: 'Admin',
	USER: 'User'
}
const regexList = {
	EMAIL: /^[a-zA-Z0-9.!#$%&' * +/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
	PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,15}$/
}

module.exports = { roles, regexList }
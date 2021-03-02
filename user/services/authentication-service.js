const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { user: User, Sequelize } = require('../models');

const signIn = async ({ email, password }) => {
  if (!email) {
    return {
      message: 'Email is required.',
      statusCode: 400
    }
  }
  if (!password) {
    return {
      message: 'Password is required.',
      statusCode: 400
    }
  }
  let user = await User.findOne({ where: { email } });
  if (!user) {
    return {
      message: 'User not found.',
      statusCode: 404
    }
  }
  user = user.dataValues;
  if (bcrypt.compareSync(password, user.password)) {
    await User.update({ last_login_at: Sequelize.fn('NOW') }, { where: { email } });
    const token = jwt.sign({ firstName: user.first_name, lastName: user.last_name, email: user.email, role: user.role }, process.env.JWTSECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return {
      message: 'Success',
      statusCode: 200,
      name: 'token',
      value: token
    }
  }
  return {
    message: 'Wrong password.',
    statusCode: 400
  }

}

module.exports = {
  signIn
};

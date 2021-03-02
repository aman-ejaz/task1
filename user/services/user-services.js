const bcrypt = require('bcrypt');

const { user: User} = require("../models");
const { validateUserData } = require('../utils/validations');
const { roles } = require('../utils/constants');
require('dotenv').config()

const getAll = async userSearchQuery => {
  let users = await User.findAndCountAll(userSearchQuery);
  const count = users.count;
  users = users.rows.map(user => {
    delete user.dataValues.password;
    return user.dataValues;
  });

  return {
    name: "user",
    value: users,
    count: count,
    statusCode: 200,
    message: "Success."
  };
};

const get = async ({id}) => {
  let user = await User.findOne({ where: { id } });
  if (!user) {
    return {
      statusCode: 404,
      message: "User not found."
    };
  }
  delete user.dataValues.password;
  return {
    message: "Success",
    statusCode: 200,
    name: 'user',
    value: user.dataValues
  };
};

const createUser = async ({ userData }) => {
  let errors = validateUserData({ userData });
  if (errors) {
    return {
      message: 'Validation error',
      statusCode: 400,
      errors
    }
  }
  let user = await User.create({
    first_name: userData.firstName,
    last_name: userData.lastName,
    email: userData.email,
    password: bcrypt.hashSync(userData.password, 10),
    role: process.env.DEFAULT_ADMIN_EMAILS.split(',').includes(userData.email) ? roles.ADMIN : roles.USER
  });

  delete user.dataValues.password;
  return {
    message: 'Success',
    statusCode: 201,
    name: 'user',
    value: user.dataValues
  }
};


const update = async ({ userData, tokenData }) => {
  let errors = validateUserData({ userData, isUpdate: true });
  if (errors) {
    return {
      message: 'Validation error',
      statusCode: 400,
      errors
    }
  }
  let userExist = await User.findOne({ where: { email: tokenData.email } });
  if (!userExist) {
    return {
      message: 'User not found',
      statusCode: 404
    }
  }
  let user = await User.update({
    role: userData.role,
    first_name: userData.firstName,
    last_name: userData.lastName
  }, { where: { email: tokenData.email }, returning: true });

  delete user[1][0].dataValues.password;

  return {
    message: 'Success',
    statusCode: 200,
    name: 'user',
    value: user[1][0].dataValues
  }
};


module.exports = {
  getAll,
  get,
  update,
  createUser
}
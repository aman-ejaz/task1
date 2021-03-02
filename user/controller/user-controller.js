const { getAll, get, createUser, update } = require("../services/user-services");
const { sendFailureResponse, response } = require("../utils/utils");
const { buildSearchQuery } = require("../utils/querybuilder");


const getUsers = async (req, res) => {
  try {
    let userSearchQuery = buildSearchQuery(req.query, [["id", "ASC"]]);
    let responseData = await getAll(userSearchQuery);
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

const getUser = async (req, res) => {
  try {
    let responseData = await get({ id: req.params.id });
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

const registerUser = async (req, res) => {
  try {
    let responseData = await createUser({ userData: req.body });
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
      name: responseData.name,
      value: responseData.value,
      count: responseData.count,
      errors: responseData.errors
    });
  } catch (error) {
    sendFailureResponse({
      res,
      message: error.message,
      statusCode: 500
    });
  }
};
const updateUser = async (req, res) => {
  try {
    let responseData = await update({ userData: req.body, tokenData: req.userData });
    response({
      res,
      message: responseData.message,
      statusCode: responseData.statusCode,
      name: responseData.name,
      value: responseData.value,
      count: responseData.count,
      errors: responseData.errors
    });
  } catch (error) {
    sendFailureResponse({
      res,
      message: error.message,
      statusCode: 500
    });
  }
};

module.exports = {
  getUser,
  getUsers,
  registerUser,
  updateUser
};

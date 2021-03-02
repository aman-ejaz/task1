"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { operatorsAliases } = require("../utils/operators-aliases");
const basename = path.basename(__filename);
const db = {};

require("dotenv").config();

let sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    operatorsAliases: operatorsAliases,
    pool: {
      max: 5,
      min: 0,
      idle: 30000,
      acquire: 30000
    }
  }
);

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = sequelize;
module.exports = db;

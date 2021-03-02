'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      role: DataTypes.STRING,
      email: DataTypes.STRING,
      last_login_at: DataTypes.DATE,
      password :DataTypes.STRING
    },
    {
      timestamps: true,
      createdAt: "created_at",
      deletedAt: false,
      updatedAt: "updated_at",
      underscored: true
    }
  );

  return user;
};
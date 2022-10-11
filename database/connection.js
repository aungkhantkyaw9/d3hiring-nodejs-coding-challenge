"use strict";

const Sequelize = require("sequelize");

const sequelize = new Sequelize("university", process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'mysql',
  operatorAliases: false,
  define: {
    freezeTableName: true,
  },
});

module.exports = sequelize;

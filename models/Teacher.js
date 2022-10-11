"use strict";

const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

module.exports = sequelize.define("teacher", {
    teacher_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
    },
},
    { timestamps: false }
);
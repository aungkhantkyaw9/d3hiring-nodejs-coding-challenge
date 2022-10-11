"use strict";

const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

module.exports = sequelize.define("student", {
    student_id: {
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
    is_suspended: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
    },
},
    { timestamps: false }
);

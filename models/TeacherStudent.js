"use strict";

const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

module.exports = sequelize.define("teacher_student", {
    id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    teacher_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
    },
    student_id: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
    },
},
    { timestamps: false }
);
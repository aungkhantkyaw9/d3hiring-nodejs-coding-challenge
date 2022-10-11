"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable("teacher_student", {
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
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable("teacher_student");
    },
};

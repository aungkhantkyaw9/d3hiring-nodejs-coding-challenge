"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable("teacher", {
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
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable("teacher");
    },
};

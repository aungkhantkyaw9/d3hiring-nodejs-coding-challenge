"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("student", {
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
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("student");
  },
};

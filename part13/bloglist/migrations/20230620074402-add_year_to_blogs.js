"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("blogs", "year", {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 1991,
        max: new Date().getFullYear(),
        isInt: true,
      },
      defaultValue: new Date().getFullYear(),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("blogs", "year");
  },
};

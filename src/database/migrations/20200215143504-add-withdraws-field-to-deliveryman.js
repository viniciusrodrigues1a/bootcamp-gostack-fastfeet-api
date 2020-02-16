module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('deliverymen', 'withdraws', {
      type: Sequelize.JSON
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('deliverymen', 'withdraws');
  }
};

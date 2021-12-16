'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [
      {
        novelty_id: 1,
        user_id: '1',
        body: 'seed test comments',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        novelty_id: 2,
        user_id: 2,
        body: 'seed test comments',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        novelty_id: 3,
        user_id: 3,
        body: 'seed test comments',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

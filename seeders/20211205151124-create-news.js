'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('News', [
      {
        name: 'News 1',
        content: 'Content news 1',
        image: 'https://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'News 2',
        content: 'Content news 2',
        image: 'https://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'News 3',
        content: 'Content news 3',
        image: 'https://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg',
        categoryId: 1,
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

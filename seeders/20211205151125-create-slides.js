module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Slides', [
      {
        imageUrl: 'imagen1.jpg',
        text: 'esta es la imagen 1',
        order: 1,
        organizationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'imagen2.jpg',
        text: 'esta es la imagen 2',
        order: 2,
        organizationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: 'imagen3.jpg',
        text: 'esta es la imagen 3',
        order: 3,
        organizationId: 1,
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

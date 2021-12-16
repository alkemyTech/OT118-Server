module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      {
        name: 'news',
        description: 'News category.',
        image: 'image04.jpg',
        updatedAt: new Date(),
        createdAt: new Date(),
      }
    ];
    for (let index = 1; index < 38; index++) {
      const category = {
        name: `Category ${index}`,
        description: 'Description of a generic category.',
        image: 'image01.jpg',
        updatedAt: new Date(),
        createdAt: new Date(),
      };
      categories.push(category);
    }
    await queryInterface.bulkInsert(
      'Categories',
      categories,
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([

      queryInterface.bulkDelete('Categories', null, {})

    ]);
  }
};

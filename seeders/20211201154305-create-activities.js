module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Activities', [{
      name: 'Apoyo escolar: Primario',
      content: 'Se realizan los talleres de lunes a jueves de 10 a 12 horas y de 14 a 16 horas en el contraturno',
      image: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Apoyo escolar: Secundario',
      content: 'Se realizan los talleres de lunes a viernes de 10 a 12 horas y de 16 a 18 horas en el contraturno',
      image: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Taller de Arte y Cuentos',
      content: 'Taller literario y de manualidades',
      image: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Paseos recreativos y educativos',
      content: 'Paseos pensados para promover la participacion de niños, niñas y adolescecntes en el area educativa',
      image: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {

  }
};

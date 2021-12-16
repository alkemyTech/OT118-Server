'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Testimonials', [{
      name: 'Testimonial 1',
      image: 'https://i1.sndcdn.com/artworks-000218066450-drfbyj-t500x500.jpg',
      content: 'Apoyo diferentes jornadas enfocadas al aprovechamiento del tiempo libre de los niños, participo en jornadas de protección al medio ambiente, apoyo también actividades de mejoras locativas en diferentes colegios de mi ciudad, también hago terapia de la risa en hospitales o fundaciones, entre otros.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Testimonial 2',
      image: 'https://i1.sndcdn.com/artworks-000218066450-drfbyj-t500x500.jpg',
      content: 'Soy Licenciada en Relaciones Institucionales y trabajo vinculando a la fundación con otras ongs, y con diferentes instituciones tanto privadas como estatales. Colaboro con la formación de grupos de voluntarios y en las acciones de desarrollo de fondos.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Testimonial 3',
      image: 'https://i1.sndcdn.com/artworks-000218066450-drfbyj-t500x500.jpg',
      content: 'Soy Presidente de la Asociación Civil Bomberos Voluntarios Los Ralos y la Asociación Civil Encuentro. Ambas instituciones desarrollan actividades de asistencia y bien comun.',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Testimonials', null, {});
  }
};

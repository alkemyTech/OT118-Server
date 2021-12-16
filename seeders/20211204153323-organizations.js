'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Organizations', [{
      name: 'Somos Más',
      image: 'https://drive.google.com/file/d/1-j70Zmn2B1-0T_67JHJbNLKkI9sACMNi/view?usp=sharing',
      address: 'barrio La Cava',
      phone: 1160112988,
      email: 'somosfundacionmas@gmail.com',
      welcomeText: 'Bienvenidos a Somos Mas, un espacio para todos',
      aboutUsText: `Desde 1997 en Somos Más trabajamos con los chicos y chicas, mamás y papás,
                    abuelos y vecinos del barrio La Cava generando procesos de crecimiento y de
                    inserción social. Uniendo las manos de todas las familias, las que viven en el barrio y
                    las que viven fuera de él, es que podemos pensar, crear y garantizar estos procesos.
                    Somos una asociación civil sin fines de lucro que se creó en 1997 con la intención de
                    dar alimento a las familias del barrio. Con el tiempo fuimos involucrándonos con la
                    comunidad y agrandando y mejorando nuestra capacidad de trabajo. Hoy somos un
                    centro comunitario que acompaña a más de 700 personas a través de las áreas de:
                    Educación, deportes, primera infancia, salud, alimentación y trabajo social.`,
      urlFacebook: 'https://www.facebook.com/Somos_Más',
      urlLinkedin: 'https://www.linkedin.com/in/SomosMás/',
      urlInstagram: 'https://www.instagram.com/SomosMás',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
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

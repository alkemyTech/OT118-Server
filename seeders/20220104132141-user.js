'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [{
     firstName: 'Pepe',
     lastName: 'Pepito',
     email: 'testEmail@gmail.com',
     password: '$2a$10$9GeXoYVeYveqVS15r4VI6.aRwzO1lAWOIlvWTInd7v0N4Ug8qCZ26',
     roleId: 2,
     Image: 'image.png',
     createdAt: new Date,
     updatedAt: new Date
   }, {
    firstName: 'Rosa',
    lastName: 'Rosamonte',
    email: 'testEmail1@gmail.com',
    password: '$2a$10$XR1pmMLIQfqVIbwOKNGrsuueVY/Xxi7zqLrmZ.NOr1QI.iGNDyPu6',
    roleId: 2,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }, {
    firstName: 'Jorge',
    lastName: 'Espasa',
    email: 'testEmail2@gmail.com',
    password: '$2a$10$6exdqxUbbslVhNMau5HljOnPqbU0XIhWYxzsdcMMTyDUCRIqqvcCK',
    roleId: 2,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }, {
    firstName: 'Abel',
    lastName: 'Martinez',
    email: 'testEmail3@gmail.com',
    password: '$2a$10$U0NS5VU838y4s07aJr/Oqe/uOmbGd.DjKZJk1ebmw3GG648AsF/Pi',
    roleId: 2,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }, {
    firstName: 'Martin',
    lastName: 'Romero',
    email: 'testEmail4@gmail.com',
    password: '$2a$10$b5JmjQNiYf6XxgDSEwEt4eNlc9S3ltiwkaZR8ADcNsMOXWR0n/YXu',
    roleId: 2,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }, {
    firstName: 'Belen',
    lastName: 'Perez',
    email: 'testEmail5@gmail.com',
    password: '$2a$10$vmUqXXV8eQvcfZe3Q02HZePGkK8wO8TgeADzNk/Wbj/7qkIi1vOu6',
    roleId: 2,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }, {
    firstName: 'Prinscila',
    lastName: 'Ramirez',
    email: 'testEmail6@gmail.com',
    password: '$2a$10$qqmEKWmuVPV8A4KTDmnpyOmjn8jvo4TrmIV.Y8CtufzA.lFv0ljHK',
    roleId: 2,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }, {
    firstName: 'Gabriel',
    lastName: 'Antonio',
    email: 'testEmail7@gmail.com',
    password: '$2a$10$FZvp2bEhkBSGR8O7JKVEd.UBIbBKbDBGVlLxtrNuGLwnoLa1n3nM2',
    roleId: 2,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }, {
    firstName: 'Brian',
    lastName: 'Fernandez',
    email: 'testEmail8@gmail.com',
    password: '$2a$10$DkD4DSKxpfO70YI5CWQLXeXeNuZuLKw/4IoWfs2eqAPPEt.tt6JIS',
    roleId: 2,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }, {
    firstName: 'Anastasia',
    lastName: 'Epson',
    email: 'testEmail9@gmail.com',
    password: '$2a$10$VZ.btbarjm7hy39WT3eeA.Z5Nb5Uu.josutj2wMffkQaZWH19Dgkm',
    roleId: 2,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }, {
    firstName: 'Gonzalo',
    lastName: 'Perez',
    email: 'testEmail10@gmail.com',
    password: '$2a$10$iXy1yvP88sp4tKoblahJPOhivuKf5EcRp07bfKMOe4nFW5gCE4yfK',
    roleId: 2,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }, {
    firstName: 'rick',
    lastName: 'Perez',
    email: 'testAdminEmail1@gmail.com',
    password: '$2a$10$djfA6hcb7GgD6j0mr12SLuSMgPmmr0Mu7JDKIqPPrqiY/l9N4Q6He',
    roleId: 1,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }, {
    firstName: 'Federico',
    lastName: 'Mortero',
    email: 'testAdminEmail2@gmail.com',
    password: '$2a$10$XzObi93a4LX4QIg3X6R3WuecjukD0/Q0XGObCRY2l/gAtAe1eFK2O',
    roleId: 1,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }, {
    firstName: 'Miles',
    lastName: 'Morales',
    email: 'testAdminEmail3@gmail.com',
    password: '$2a$10$nxhaEJAbhbVL0kextFzu9uW8rmQYNOuDsx8s5gxmdlmRFo44XyThm',
    roleId: 1,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }, {
    firstName: 'Miguel',
    lastName: 'Diaz',
    email: 'testAdminEmail4@gmail.com',
    password: '$2a$10$cCrKL29RcAFYGY9au7aW9e7Jg7v9pH4CIzXjCBCPYToZ6m7RJmjSq',
    roleId: 1,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }, {
    firstName: 'Lara',
    lastName: 'Cisneros',
    email: 'testAdminEmail5@gmail.com',
    password: '$2a$10$S5d83bLQSgYBX8Ia2v4pqOEeYeWIDfczHpLgEQ7FOyZAB48C4wSly',
    roleId: 1,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }, {
    firstName: 'Ricardo',
    lastName: 'Benitez',
    email: 'testAdminEmail6@gmail.com',
    password: '$2a$10$TjhR/0Zi3bY8UamfmuT/DuHq6wCG0WhstWniY9XGaN33kGOVBbMVq',
    roleId: 1,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }, {
    firstName: 'Axel',
    lastName: 'Jimenez',
    email: 'testAdminEmail7@gmail.com',
    password: '$2a$10$tp/WJbq.3uJ189k61bGzvup4JSBVVxfJ/V7rc2BwcQLDOeAGCIjGu',
    roleId: 1,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }, {
    firstName: 'Ramiro',
    lastName: 'Juarez',
    email: 'testAdminEmail8@gmail.com',
    password: '$2a$10$ZTwFJKa6VI0TaPG4uSF9o.k4nStIrIfVc4k.gmaQOfOsOJbijm1cy',
    roleId: 1,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }, {
    firstName: 'Esteban',
    lastName: 'Rogers',
    email: 'testAdminEmail9@gmail.com',
    password: '$2a$10$fgHya0B2o1XV4jx2xLlDj.AUI/wMrSqkbLClr.zyFC17AEGODMHrS',
    roleId: 1,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }, {
    firstName: 'Elias',
    lastName: 'Valdez',
    email: 'testAdminEmail10@gmail.com',
    password: '$2a$10$HQT.TwN7WeTWtFQKD0w.h.o/.GyO2.NpbIMv.23TGHH3jg6RoGuuy',
    roleId: 1,
    Image: 'image.png',
    createdAt: new Date,
    updatedAt: new Date
   }])
  },

  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkDelete('Users', null, {});
    
  }
};

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'Proyecto Somos Mas',
          version: '0.0.1',
          description:
            'This is a CRUD API application made with Express and documented with Swagger for Somos Mas',
        },
        servers: [
          {
            url: `http://localhost:3000`,
            description: 'Development server',
          },
        ],
      },
      apis: ['./routes/*'],
}

module.exports = options;
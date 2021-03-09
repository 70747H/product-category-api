const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const dotenv = require('dotenv');

dotenv.config();

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'REST API', // Title of the documentation
        version: '1.0.0', // Version of the app
        description: 'This is the REST API', // short description of the app
        termsOfService: 'http://swagger.io/terms/',
        contact: {
            email: 'admin@fatura.com'
        },
        license: {
            name: 'Apache 2.0',
            url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    host: `localhost:${process.env.APP_PORT}`, // the host or url of the app
    basePath: '', // the basepath of your endpoint
    schemes: ['https', 'http']
};

// options for the swagger docs
const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    // path to the API docs
    apis: ['./src/routes/**/*.doc.yaml']
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

function addSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = {
    addSwagger
};

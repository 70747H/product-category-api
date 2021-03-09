const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const handleSequelizeErrors = require('./src/middleware/sequelize-error.middleware');
const winston = require('./src/middleware/winston.middleware');
const auditLog = require('./src/middleware/audit_log.middleware');
require('./src/database/models');
const posRoutes = require('./src/routes');
const { formatResponse } = require('./src/helpers/response.helper');

const app = express();

dotenv.config();

const enableLogging = process.env.AUDIT_LOG_POS === 'true' || false;

// Swagger
const swagger = require('./api.swagger');

swagger.addSwagger(app);

app.disable('x-powered-by');
app.use(helmet());
// CORS
app.use(cors());
app.options('*', cors());
app.use(express.json({ limit: '50mb', strict: false, type: '*/*' }));

if(enableLogging)
	app.use(auditLog);

app.use(createLogs);
posRoutes.setRoutes(app);
app.use(handleNotFound);
app.use(handleSequelizeErrors);
app.use(handleErrors);

module.exports = app;

function handleErrors(err, req, res, next) {
  const ip = req.connection.remoteAddress;
  const statusCode = err.status || 500;
  const statusMessage = err.statusCode || 'Internal Server Error';
  const errorMessage = err.message;

  winston.error({
		address: ip,
		path: req.path,
		headers: req.headers,
		params: req.params,
		query: req.query,
		statusCode,
		statusMessage,
		errorMessage,
		SequelizeForeignKeyConstraintError: err.SequelizeForeignKeyConstraintError,
		endpoint: req.path,
		type: req.method,
		request: req.body
	});

  if (err.transaction)
    err.transaction.rollback();

  res.status(statusCode).json(formatResponse(null, statusCode, statusMessage, err.message));
  next();
}

function handleNotFound(req, res, next) {
  const ip = req.connection.remoteAddress;
  const statusCode = 404;
  const statusMessage = 'NOT FOUND';
  winston.error({
		address: ip,
		path: req.path,
		headers: req.headers,
		params: req.params,
		query: req.query,
		statusCode,
		errorMessage: statusMessage,
		endpoint: req.path,
		type: req.method,
		request: req.body
	});
  res.status(statusCode).json(formatResponse(null, statusCode, statusMessage, statusMessage));
  next();
}

function createLogs(req, res, next) {
  const ip = req.connection.remoteAddress;
  winston.info({
		address: ip,
		path: req.path,
		headers: req.headers,
		params: req.params,
		query: req.query,
		endpoint: req.path,
		type: req.method,
		request: req.body
	});
  next();
}

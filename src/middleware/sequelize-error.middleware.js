const SequelizeHelper = require('../helpers/Sequelize.helper');

function handleErrors(err, req, res, next) {
  next(SequelizeHelper.wrapError(err,));
}

module.exports = handleErrors;

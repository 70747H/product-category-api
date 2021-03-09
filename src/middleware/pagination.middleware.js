const {defaultPageLimit}  = require('../constants/pagination.constants');

const pagination = () => (req, res, next) => {
  const reqQuery = req.query;
  const { page } = reqQuery;
  const offset = page ? (page - 1) * defaultPageLimit : 0;

  req.query = { ...req.query, offset, limit: defaultPageLimit };

  next();
};

module.exports= {
  pagination
};

const GeneralException = require('../exceptions/general.exception');

function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.unknown().validate(req, { abortEarly: true, stripUnknown: true });
    req.query = { ...value.query };
    req.params = { ...value.params };
    req.body = Array.isArray(req.body)? [...req.body] : { ...value.body };
    if (error)
      return next(GeneralException.BadRequest(error.details[0].message.replace(/"/g, '')));

    next();
  };
}

module.exports = validate;

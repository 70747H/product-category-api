const ErrorResponses = require('../constants/http-responses.constants');

function getLanguageIsoCode(languageId) {
  return languageId === 1 ? 'en' : 'ar';
}

function ValidationError(message, transaction) {
  return {
 status: ErrorResponses.BadRequest.code, statusCode: ErrorResponses.BadRequest.name, message: `${message}`, transaction
};
}

function NotFoundError(message, transaction) {
  return {
 status: ErrorResponses.NotFound.code, statusCode: ErrorResponses.NotFound.name, message, transaction
};
}

function AuthenticationError(message, transaction) {
  return {
 status: ErrorResponses.Unauthorized.code, statusCode: ErrorResponses.Unauthorized.name, message, transaction
};
}

function BadRequest(message, transaction) {
  return {
 status: ErrorResponses.BadRequest.code, statusCode: ErrorResponses.BadRequest.name, message, transaction
};
}

function InvalidCountry(languageId, transaction) {
  const message = {
    en: 'Enter Valid Country Code',
    ar: 'أدخل رمز البلد صالح'
  };
  return {
 status: ErrorResponses.Forbidden.code, statusCode: ErrorResponses.Forbidden.name, message: message[getLanguageIsoCode(languageId)], transaction
};
}

function InvalidGroup(languageId, transaction) {
  const message = {
    en: 'Enter Valid Group Code',
    ar: 'أدخل رمز مجموعة صالح'
  };
  return {
 status: ErrorResponses.Forbidden.code, statusCode: ErrorResponses.Forbidden.name, message: message[getLanguageIsoCode(languageId)], transaction
};
}


function InvalidPaymentMethod(languageId, transaction) {
  const message = {
    en: 'Enter Valid Payment Method Id',
    ar: 'أدخل رمز البلد صالح'
};
  return {
 status: ErrorResponses.Forbidden.code, statusCode: ErrorResponses.Forbidden.name, message: message[getLanguageIsoCode(languageId)], transaction
};
}

module.exports = {
  ValidationError,
  AuthenticationError,
  NotFoundError,
  BadRequest,
  InvalidCountry,
  InvalidGroup,
  InvalidPaymentMethod
};

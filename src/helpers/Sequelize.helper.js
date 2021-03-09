const is = require('./type-validation.helper');
const ErrorResponses = require('../constants/http-responses.constants');

function getLanguageIsoCode(languageId) {
  if (languageId)
    return languageId === 1 ? 'en' : 'ar';
  return 'en';
}

function extractForeignKey(errMsg) {
  const referenceRegex = /FOREIGN KEY?.+REFERENCES/gm;
  const ForeignKeyRegex = /`.+`/gm;
  const foreignKeyMatch = ['Foreign key'];
  const referenceMatch = referenceRegex.exec(errMsg);
  if (referenceMatch && referenceMatch.length)
    foreignKeyMatch[0] = ForeignKeyRegex.exec(referenceMatch[0])[0];

  return foreignKeyMatch[0];
}

function extractColumnNoDefault(errMsg) {
  const noDefaultValueRegex = /Field.+doesn't have a default value/gm;
  const fieldRegex = /\'.+\' /gm;
  const fieldMatch = [];
  const noDefaultValueMatch = noDefaultValueRegex.exec(errMsg);
  if (noDefaultValueMatch && noDefaultValueMatch.length)
    fieldMatch[0] = fieldRegex.exec(noDefaultValueMatch[0])[0];

  return fieldMatch[0];
}

function extractDataTruncateForColumn(errMsg) {
  const dataTruncateForColumnRegex = /Data truncated for column 'type'/gm;
  const fieldRegex = /\'.+\'/gm;
  const fieldMatch = [];
  const dataTruncateForColumnMatch = dataTruncateForColumnRegex.exec(errMsg);
  if (dataTruncateForColumnMatch && dataTruncateForColumnMatch.length)
    fieldMatch[0] = fieldRegex.exec(dataTruncateForColumnMatch[0])[0];

  return fieldMatch[0];
}

function wrapError(error, languageId) {
  let message = {};

  if (error.name) {
    if (error.name.includes('UniqueConstraint')) //  error instanceof Sequelize.ForeignKeyConstraintError
      message = {
        en: `${error.errors[0].path} Is Already Used`,
        ar: `${error.errors[0].path} موجود بالفعل `
      };

    if (error.name.includes('ForeignKeyConstraint')) //  error instanceof Sequelize.ForeignKeyConstraintError
      message = {
        en: `Invalid ID for ${error.fields || extractForeignKey(error.message)}`,
        ar: ` غير صحيح ${error.fields || extractForeignKey(error.message)}`
      };

    if (error.name.includes('SequelizeDatabaseError')) { //  error instanceof Sequelize.ForeignKeyConstraintError
      if (extractColumnNoDefault(error.message))
        message = {
          en: `Field ${error.fields || extractColumnNoDefault(error.message)} can't be empty`,
          ar: `${error.fields || extractColumnNoDefault(error.message)} لا يوجد قيمه `
        };

      if (extractDataTruncateForColumn(error.message))
        message = {
          en: `Field ${error.fields || extractDataTruncateForColumn(error.message)} has wrong value`,
          ar: `${error.fields || extractDataTruncateForColumn(error.message)} قيمته المدخله خطأ `
        };
    }
  }

  if (is.empty(message))
    return error;

  return {
    status: ErrorResponses.BadRequest.code,
    statusCode: ErrorResponses.BadRequest.name,
    message: message[getLanguageIsoCode(languageId)]
  };
}

module.exports = {
  wrapError
};

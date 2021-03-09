function translate(array, objectName, keyName) {
  return array.reduce((obj, item) => {
    obj[item.iso_code] = item[objectName].length > 0 ? item[objectName][0][keyName] : null;
    return obj;
  }, {});
}

function translateAllObjects(languageArray, dataObject) {
  const translatedObject = {};

  const translationKeyName = Object.keys(dataObject).filter(x => x.includes('_translations') && x !== 'search_translations');
  const dataTranslations = dataObject[translationKeyName];

  dataTranslations.map(dataTranslation => {
    delete dataTranslation.id;
    delete dataTranslation.created_at;
    delete dataTranslation.updated_at;
    delete dataTranslation.deleted_at;
    // delete dataTranslation.language_id;

    Object.keys(dataTranslation).map(dataTranslationKey => {
      translatedObject[dataTranslationKey] = languageArray.reduce((translatedObjected, language) => {
        language = language.get({ plain: true });
        const translation = dataTranslations
          .filter(dataTranslation => dataTranslation.language_id === language.id);
        if (translation.length > 0)
          translatedObjected[language.iso_code] = translation[0][dataTranslationKey];
        return translatedObjected;
      }, {});
    });
  });

  delete dataObject[translationKeyName];

  return translatedObject;
}

module.exports = {
  translate,
	translateAllObjects
};

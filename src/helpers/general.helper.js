const moment = require('moment');

const is = require('./type-validation.helper');

const today = () => new Date();

const todayMilliseconds = () => new Date().getTime();

const isvalidEmail = email => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const isValidDate = date => {
  const matches = /(\d{4})[-/](d{2})[-/](d{2})/.exec(date);
  if (matches === null)
    return false;

  const day = matches[3];
  const month = matches[2] - 1;
  const year = matches[1];
  const composedDate = new Date(year, month, day);
  return composedDate.getDate() === day &&
      composedDate.getMonth() === month &&
      composedDate.getFullYear() === year;
};

const convertArabicToEnglishNumbers = dateStr => {
  if (!dateStr && dateStr === '')
    return dateStr;

  let finalDate = '';
  const standard = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const easternArabicSymbols = [
    '٠',
    '١',
    '٢',
    '٣',
    '٤',
    '٥',
    '٦',
    '٧',
    '٨',
    '٩'];
  for (const i in dateStr)
    if (easternArabicSymbols.indexOf(dateStr[i]) >= 0)
      finalDate += standard[easternArabicSymbols.indexOf(dateStr[i])];
    else
      finalDate += dateStr[i];


  return finalDate;
};


const changeDateFormat = dateStr => {
  if (!dateStr)
    return dateStr;

  const tempDate = dateStr.split('-');
  if (tempDate.length < 3)
    return dateStr;

  return `${tempDate[2]}-${tempDate[1]}-${tempDate[0]}`;
};

const getDateTime = () => {
  const date = new Date();

  let hour = date.getHours();
  hour = (hour < 10 ? '0' : '') + hour;

  let min = date.getMinutes();
  min = (min < 10 ? '0' : '') + min;

  let sec = date.getSeconds();
  sec = (sec < 10 ? '0' : '') + sec;

  const year = date.getFullYear();

  let month = date.getMonth() + 1;
  month = (month < 10 ? '0' : '') + month;

  let day = date.getDate();
  day = (day < 10 ? '0' : '') + day;

  return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
};

const calculateDays = (current, before) => {
  const diff = moment.duration(moment(current).diff(moment(before)));
  return diff.asMinutes();
};

function filterUndefined(objectToFilter) {
  Object.keys(objectToFilter).forEach(key => objectToFilter[key] === undefined ? delete objectToFilter[key] : {});
}

function filterBad(objectToFilter) {
  Object.keys(objectToFilter).forEach(key => is.bad(objectToFilter[key]) ? delete objectToFilter[key] : {});
}


module.exports = {
  today,
  todayMilliseconds,
  isvalidEmail,
  isValidDate,
  convert_arbic_to_english_date: convertArabicToEnglishNumbers,
  change_date_format: changeDateFormat,
  getDateTime,
  calculateDays,
  filterUndefined,
  filterBad
};

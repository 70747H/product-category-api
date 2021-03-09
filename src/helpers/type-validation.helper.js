const moment = require('moment');

/*
How to use
const is = require('type-validation.helper')
if (is.str(hello))
 */

// date
function date(value) {
  return moment(value).isValid() || value instanceof Date;
}

// error
function err(value) {
  return value instanceof Error && typeof value.message !== 'undefined';
}

// json
function json(value) {
  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    return false;
  }
}

// integer
function int(value) {
  return typeof value === 'number' && isFinite(value) && Number.isInteger(value);
}

// null
function nll(value) {
  return value == null;
}

// null or undefined
function noru(value) {
  return value == null || typeof value === 'undefined';
}

// number
function num(value) {
  return typeof value === 'number' && isFinite(value);
}

// object
function obj(value) {
  return value && typeof value === 'object' && value.constructor === Object;
}

// regex
function regex(value) {
  return value && typeof value === 'object' && value.constructor === RegExp;
}

// string
function str(value) {
  return typeof value === 'string' || value instanceof String;
}

// undefined
function undef(value) {
  return value === undefined || typeof value === 'undefined';
}

// NaN
function nan(value) {
  return Number.isNaN(value);
}

// array
function arr(value) {
  return value && typeof value === 'object' && value.constructor === Array;
}

// empty
function empty(value) {
  return (str(value) && value.trim() === '') || (arr(value) && value.length === 0) || (obj(value) && Object.keys(value).length === 0);
}

// bad
function bad(value) {
  return nll(value) || undef(value) || empty(value) || err(value) || nan(value);
}

// boolean
function bool(value) {
  return typeof value === 'boolean';
}

const is = {
  arr,
  bad,
  bool,
  date,
  empty,
  err,
  int,
  json,
  nll,
  noru,
  num,
  obj,
  regex,
  str,
  undef,
  what
};

// return type(s) of $value
function what(value) {
  // what
  const wat = [];
  const checks = [
        { fn: 'arr', name: 'array' },
        { fn: 'bool', name: 'boolean' },
        { fn: 'date', name: 'date' },
        { fn: 'err', name: 'error' },
        { fn: 'int', name: 'integer' },
        { fn: 'json', name: 'json' },
        { fn: 'nll', name: 'null' },
        { fn: 'num', name: 'number' },
        { fn: 'obj', name: 'object' },
        { fn: 'regex', name: 'regexp' },
        { fn: 'str', name: 'string' },
        { fn: 'undef', name: 'undefined' }
  ];
  checks.forEach(check => {
    if (is[check.fn](value))
      wat.push(check.name);
  });
  if (is.noru(value))
    throw new Error('Missing value to test.');
  return wat.length === 1 ? wat[0] : wat;
}

module.exports = is;

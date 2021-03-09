const path = require('path');
const mixPanel = require('./mixpanel.config');
const dbConfig = require('./db.config');
const cryptoConfig = require('./crypto.config');
const jwtConfig = require('./jwt.config');
const mailConfig = require('./email.config');
const sendGridConfig = require('./send-grid.config');
const firebaseConfig = require('./firebase.config');

module.exports = {

  // Stop running tests after `n` failures
  bail: true,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/bin/',
    '/config/',
    '/constants/',
    '/helpers/',
    '/logs/',
    '/middleware/',
    '/migrations/',
    '/models/',
    '/passport/',
    '/seeders/',
    '/database/'
  ],

  // A path to a module which exports an async function that is triggered once before all test suites
  globalSetup: path.join(__dirname, '../test/test-before-start'),
  displayName: { name: 'POS', color: 'blue' },

  // A set of global variables that need to be available in all test environments
  globals: {
    __base: __dirname,
    __dbConfig: dbConfig,
    __mixpanel: mixPanel,
    __jwtConfig: jwtConfig,
    __cryptoConfig: cryptoConfig,
    __mailConfig: mailConfig,
    __firebaseConfig: firebaseConfig,
    __sendGridConfig: sendGridConfig
  },

  // Test match
  rootDir: path.join(__dirname, '../'),
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)',
    '<rootDir>/routes-pos/**/?(*.)+(spec|test).[tj]s?(x)'],

  // Indicates whether each individual test should be reported during the run
  verbose: false,

  // Extend Jest
  setupFilesAfterEnv: ['jest-extended', 'jest-chain']
};

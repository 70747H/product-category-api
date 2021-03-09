const Sequelize = require('sequelize');

const dotenv = require('dotenv');

dotenv.config();
const config = require('../src/config/db.config')[process.env.APP_ENVIRONMENT];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

async function beforeAllTests() {
  try {
    await sequelize.query('select 1+1');
  } catch (e) {
    process.exit(1);
  }
}

module.exports = beforeAllTests;

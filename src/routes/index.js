const glob = require('glob');
const path = require('path');

function setRoutes(app) {
  const options = {};
  const files = glob.sync('**/*.router.js', options);
  files.map(file => {
    app.use('/', require(path.resolve(`${__dirname}/../..`, `${file}`)));
  });
}

module.exports = {
    setRoutes
};

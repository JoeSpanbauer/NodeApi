const routes = require('../common/routes');
const controller = require('./controller');

const path = '/member';

module.exports = {
  routes: routes({ path, controller }),
};

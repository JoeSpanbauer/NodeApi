const { create } = require('../common/controller');
const validation = require('./validation');
const queries = require('./queries');

const getDataObject = (data) => ({
  id: data.id,
  username: data.username,
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  phoneNumber: data.phoneNumber,
});

module.exports = create(getDataObject, queries, validation);

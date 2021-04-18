require('dotenv').config();
const commonQueries = require('../common/queries')(process.env.DB_MEMBER_TABLE_NAME);

module.exports = commonQueries;

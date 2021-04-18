require('dotenv').config();
const { call } = require('./connection')();

module.exports = (tableName) => {
  const get = () => {
    const query = `SELECT * FROM ${process.env.DB_NAME}.${tableName}`;
    return call(query);
  };

  const getById = (data) => {
    const query = `SELECT * FROM ${process.env.DB_NAME}.${tableName} WHERE id = ?`;
    return call(query, data);
  };

  const insert = async (data) => {
    const query = `INSERT INTO ${process.env.DB_NAME}.${tableName} SET ?`;
    const { insertId } = await call(query, data);
    return insertId;
  };

  const replace = async (data) => {
    const query = `UPDATE ${process.env.DB_NAME}.${tableName} SET ? WHERE id = ?`;
    await call(query, [data, data.id]);
    return data.id;
  };

  const deleteById = async (data) => {
    const query = `DELETE FROM ${process.env.DB_NAME}.${tableName} WHERE id = ?`;
    await call(query, data);
    return data;
  };

  return {
    get,
    getById,
    insert,
    replace,
    deleteById,
  };
};

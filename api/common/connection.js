// const { Client } = require('pg'); // Postgres
const mysqlPackage = require('mysql8'); // MySQL

module.exports = (mysql = mysqlPackage) => {
  // Multiple Query Functionality
  const getConnection = () => {
    // Postgres
    // const connection = new Client({
    //   connectionString: process.env.DATABASE_URL,
    //   ssl: true,
    // });

    // MySQL
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    return connection;
  };

  const query = async (connection, dbQuery, data) => {
    const resonse = await new Promise((resolve, reject) => {
      connection.query(dbQuery, data, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    return resonse;
  };

  // Single Query Functionality
  const call = async (dbQuery, data) => {
    // Postgres
  // const connection = new Client({
  //   connectionString: process.env.DATABASE_URL,
  //   ssl: true,
  // });

    // MySQL
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    connection.connect();

    const resonse = await new Promise((resolve, reject) => {
      connection.query(dbQuery, data, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    connection.end();

    return resonse;
  };

  return {
    getConnection,
    query,
    call,
  };
};

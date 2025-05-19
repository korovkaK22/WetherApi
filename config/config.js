require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || 'weatherapi_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME_TEST || 'weatherapi_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME_PROD || 'weatherapi_prod',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres'
  }
};

const { Sequelize } = require('sequelize');
const dbConfig = require('./config.js');

const database_conn = new Sequelize(
    dbConfig.DB_NAME,
    dbConfig.DB_USER,
    dbConfig.DB_PASSWORD,
    {
        host: dbConfig.DB_HOST,
        dialect: dbConfig.dialect,
        port: dbConfig.DB_PORT,
        logging: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

// Connect to the database
database_conn.authenticate().then(() => {
    console.log('Connected to database has succeeded');
}).catch((error) => {
    console.log('Error connecting to database:', error);
});

module.exports = database_conn;
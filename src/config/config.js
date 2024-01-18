module.exports = {
    PORT: 8080,
    DB_HOST: 'localhost',
    DB_USER: 'root',
    DB_PASSWORD: '',
    DB_NAME: 'translate',
    dialect: 'mysql',
    DB_PORT: 3306,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
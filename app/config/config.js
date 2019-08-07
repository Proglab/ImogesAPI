if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined) {
    const dotenv = require('dotenv');
    dotenv.config();
}

module.exports = {
    "development": {
        "username": process.env.DB_DEV_USERNAME,
        "password": process.env.DB_DEV_PASSWORD,
        "database": process.env.DB_DEV_DATABASE,
        "host": process.env.DB_DEV_HOST,
        "dialect": process.env.DB_DEV_DIALECT
    },
    "test": {
        "username": process.env.DB_TEST_USERNAME,
        "password": process.env.DB_TEST_PASSWORD,
        "database": process.env.DB_TEST_DATABASE,
        "host": process.env.DB_TEST_HOST,
        "dialect": process.env.DB_TEST_DIALECT
    },
    "production": {
        "use_env_variable": 'DATABASE_URL',
        "url": process.env.JAWSDB_URL
    },
    'secret': process.env.SECRET,
    ROLEs: process.env.ROLES
};

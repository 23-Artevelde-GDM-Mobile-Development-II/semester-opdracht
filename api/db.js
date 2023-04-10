const Pool = require("pg/lib").Pool;

const pool = new Pool({
    user: '',
    database: '',
    password: '',
    port: '5432',
    host: '127.0.0.1',
    ideTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

module.exports = pool;
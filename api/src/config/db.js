import { createPool } from 'mysql2/promise';

let pool = null;

async function criarPoolDeConexoes() {
    if (!pool) {
        pool = createPool({
            host: 'localhost',
            port: '3306',
            database: 'rotacar',
            user: 'root',
            password: '1234',
            waitForConnections: true,
            connectionLimit: 100,
            multipleStatements: true
        });
    }
    return pool;
}

async function obterConexaoDoPool() {
    const pool = await criarPoolDeConexoes();
    return pool.getConnection();
}

export default obterConexaoDoPool;
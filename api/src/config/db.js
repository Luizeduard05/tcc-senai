
import { createPool } from 'mysql2/promise';

let pool = null;

async function criarPoolDeConexoes() {
    if (!pool) {
        pool = createPool({
            host: 'localhost',
            port: '3306',
            database: 'rotacar',
            user: 'rotacar',
            password: '9876543210',
            waitForConnections: true,
            connectionLimit: 10,
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
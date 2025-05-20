// lib/db/mariadb.js
import mariadb from 'mariadb';

export const pool = mariadb.createPool({
    host: 'localhost',
    user: 'kine',
    password: 'kulekine1234',
    database: 'IMDB',
    connectionLimit: 5
});

export async function getConnection() {
    try {
        return await pool.getConnection();
    } catch (error) {
        console.error('Error connecting to MariaDB:', error);
        throw error;
    }
}

export async function query(sql, params) {
    let conn;
    try {
        conn = await getConnection();
        return await conn.query(sql, params);
    } catch (error) {
        console.error('MariaDB query error:', error);
        throw error;
    } finally {
        if (conn) {
            conn.release(); // Release connection back to pool
        }
    }
}
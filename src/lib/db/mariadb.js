// lib/db/mariadb.js
import 'dotenv/config';
import mariadb from 'mariadb';

// Create connection pool
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

export async function query(sql, params) {
    let conn;
    try {
        conn = await pool.getConnection();
        return await conn.query(sql, params);
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
}






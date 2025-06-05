// lib/db/mariadb.js
import 'dotenv/config'; // OR: import dotenv from 'dotenv'; dotenv.config();
import mariadb from 'mariadb';

export const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 5
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
            conn.release(); 
        }
    }
}







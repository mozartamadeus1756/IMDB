// // for å koble til dtabasen !! 
// src/lib/db/azuresql.js
import sql from 'mssql';

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, // din-server.database.windows.net
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // Azure krever SSL
        trustServerCertificate: false
    }
};

export async function query(sqlQuery, params) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('param1', params[0])
            .input('param2', params[1])
            .query(sqlQuery);
        return result.recordset;
    } catch (err) {
        console.error('Database error:', err);
        throw err;
    }
}




// import 'dotenv/config';
// import mariadb from 'mariadb';

// const pool = mariadb.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     connectionLimit: 5
// });

// export async function query(sql, params) {
//     let conn;
//     try {
//         conn = await pool.getConnection();
//         return await conn.query(sql, params);
//     } catch (error) {
//         console.error('Database error:', error);
//         throw error;
//     } finally {
//         if (conn) conn.release();
//     }
// }



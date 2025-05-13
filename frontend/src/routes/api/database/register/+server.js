import { env } from "frontend/src/routes/api/database/.env";
import mariadb from 'mariadb'; 

const pool = mariadb.createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    connectionLimit: parseInt(env.DB_CONN_LIMIT) || 5
});

export async function POST({ request }) {
    let conn;
	try {
        const { username, email, password } = await request.json();
        console.log('Received registration request:', { username, email });
        
        conn = await pool.getConnection();

        const result = await conn.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
        );
        
        console.log('Database insert result:', result);
        // Returnerer en suksessrespons
        return new Response(
            JSON.stringify({ 
                success: true, 
                message: "User registered successfully" 
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
	} catch (error) {
		// Logger feilen for debugging
		console.error("Error:", error);
		// Returnerer en feilmelding som en JSON-respons
		return new Response(
			JSON.stringify({ error: "Internal Server Error" }),
			{
				status: 500, // HTTP-statuskode for intern serverfeil
				headers: {
					"Content-Type": "application/json", // Angir at vi sender JSON-data
				},
			}
		);
	}
}

// require('dotenv').config();
// const mariadb = require('mariadb');
// const express = require('express')
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const app = express();

// const port = 5001;

// const pool = mariadb.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     connectionLimit: process.env.DB_CONN_LIMIT
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors()); 
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.json('Backend server connection successful');
// });

// app.post('/register', async (req, res) => {
//     let conn;
//     console.log('Received registration request:', req.body);
//     try {
//         const { username, email, password } = req.body;
  
//         conn = await pool.getConnection();
//         await conn.query(
//             'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
//             [username, email, password]
//         );
  
//         res.json({ success: true, message: 'user registered successfully' });
//     } catch (error) {
//         console.error('registration error:', error);
//         res.status(500).json({ success: false, message: 'registration failed' });
//     } finally {
//         if (conn) await conn.release();
//     } 
// });


// app.listen(port, () => {
//     console.log(`Server running! http://localhost:${port}`); //  http://localhost:${port}
//   });
  


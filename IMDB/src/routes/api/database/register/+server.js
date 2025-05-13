// Enhanced backend registration endpoint
import { env } from '$env/dynamic/private';
import mariadb from 'mariadb';
import bcrypt from 'bcrypt'; // You'll need to install this package

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
        
        // Input validation
        if (!username || !email || !password) {
            return new Response(
                JSON.stringify({ error: "All fields are required" }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }
        
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(
                JSON.stringify({ error: "Invalid email format" }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        console.log('Received registration request:', { username, email });
        
        // Hash the password (IMPORTANT for security)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        conn = await pool.getConnection();
        
        // Check if user already exists
        const existingUser = await conn.query(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [username, email]
        );
        
        if (existingUser.length > 0) {
            return new Response(
                JSON.stringify({ error: "Username or email already exists" }),
                {
                    status: 409,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        // Insert new user with hashed password
        const result = await conn.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        
        console.log('Database insert result:', result);
        
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
        console.error("Error:", error);
        
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } finally {
        if (conn) {
            conn.release(); // Important: always release the connection
        }
    }
}



// import { env } from '$env/dynamic/private'; // Importerer miljøvariabler fra SvelteKit
// import mariadb from 'mariadb'; 

// const pool = mariadb.createPool({
//     host: env.DB_HOST,
//     user: env.DB_USER,
//     password: env.DB_PASSWORD,
//     database: env.DB_NAME,
//     connectionLimit: parseInt(env.DB_CONN_LIMIT) || 5
// });

// export async function POST({ request }) {
//     let conn;
// 	try {
//         const { username, email, password } = await request.json();
//         console.log('Received registration request:', { username, email });
        
//         conn = await pool.getConnection();

//         const result = await conn.query(
//             'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
//             [username, email, password]
//         );
        
//         console.log('Database insert result:', result);
//         // Returnerer en suksessrespons
//         return new Response(
//             JSON.stringify({ 
//                 success: true, 
//                 message: "User registered successfully" 
//             }),
//             {
//                 status: 200,
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             }
//         );
// 	} catch (error) {
// 		// Logger feilen for debugging
// 		console.error("Error:", error);
// 		// Returnerer en feilmelding som en JSON-respons
// 		return new Response(
// 			JSON.stringify({ error: "Internal Server Error" }),
// 			{
// 				status: 500, // HTTP-statuskode for intern serverfeil
// 				headers: {
// 					"Content-Type": "application/json", // Angir at vi sender JSON-data
// 				},
// 			}
// 		);
// 	}
// }


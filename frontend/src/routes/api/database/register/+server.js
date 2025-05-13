import { env } from "$env/dynamic/private"; // Importerer miljøvariabler fra en privat fil
import mariadb from 'mariadb'; // Use ES module import syntax

// Create the database connection pool
const pool = mariadb.createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    connectionLimit: parseInt(env.DB_CONN_LIMIT) || 10 // Ensure it's a number
});

// Funksjon som håndterer POST-forespørsler
export async function POST({ request }) {
    let conn;
    try {
        // Henter JSON data fra forespørselen
        const { username, email, password } = await request.json();
        
        // Log the received data (without password for security)
        console.log('Received registration request:', { username, email });
        
        try {
            // Oppretter en forbindelse til databasen
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
            
        } catch (dbError) {
            console.error('Database error:', dbError);
            
            // Check for duplicate entry errors
            if (dbError.code === 'ER_DUP_ENTRY') {
                return new Response(
                    JSON.stringify({ 
                        success: false, 
                        message: "Username or email already exists" 
                    }),
                    {
                        status: 409, // Conflict status code
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            }
            
            // For other database errors
            throw dbError; // Let outer catch block handle it
        }
    } catch (error) {
        // Logger feilen for debugging
        console.error("Error processing request:", error);
        
        // Returnerer en feilmelding som en JSON-respons
        return new Response(
            JSON.stringify({ 
                success: false, 
                message: "Registration failed", 
                error: error.message 
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } finally {
        // Frigjør forbindelsen tilbake til poolen
        if (conn) {
            try {
                await conn.release();
            } catch (releaseError) {
                console.error("Error releasing connection:", releaseError);
            }
        }
    }
}

// import { env } from "$env/dynamic/private"; // Importerer miljøvariabler fra en privat fil

// const mariadb = require('mariadb');

// const pool = mariadb.createPool({
//     host: env.DB_HOST,
//     user: env.DB_USER,
//     password: env.DB_PASSWORD,
//     database: env.DB_NAME,
//     connectionLimit: env.DB_CONN_LIMIT
// });

// // Funksjon som håndterer POST-forespørsler
// export async function POST({ request }) {
    
// 	try {
// 		// Henter JSON data fra forespørselen
// 		const { username, email, password } = await request.json();
//         let conn;
//         console.log('Received registration request:', request.body);
// 		try {
//             // Oppretter en forbindelse til databasen
//             conn = await pool.getConnection();
//             // Setter inn data i databasen
//             await conn.query(
//                 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
//                 [username, email, password]
//             );
            
//         } catch (error) {
//             console.error('registration error:', error);
//         res.status(500).json({ success: false, message: 'registration failed' });
//     } finally {
//             // Frigjør forbindelsen tilbake til poolen
//             if (conn) await conn.release();
            
//         }

// 		// Returnerer en suksessrespons
// 		return new Response(
// 			JSON.stringify({ message: "User data written successfully" }),
// 			{
// 				status: 200, // HTTP-statuskode for suksess
// 				headers: {
// 					"Content-Type": "application/json", // Angir at vi sender JSON-data
// 				},
// 			}
// 		);
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